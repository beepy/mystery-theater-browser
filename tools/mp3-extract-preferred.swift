#!/usr/bin/swift
print("""
Usage: ./mp3-extract.swift <out.mp3|-auto|episode #> <in1.mp3> <times1.txt> [<in2.mp3> <times2.txt>, …]
This tool takes an mp3 input file and a file defining a series of time values
indicating the portions you wish to EXCLUDE from the final recording, such as
ads. Using `ffmepg`, it extracts the time periods specified without re-encoding
them, and concats them into a single new file.

The file defining the times must be tab-delimited with start and end times in
the first and second columns, as seconds values. For example:
```
0.000000  3.419055
98.975589 219.278310
1020.535875 1144.540577
```
""")

import Foundation

extension String {
  func padLeft(_ totalWidth: Int, with byString:String) -> String {
    let toPad = totalWidth - self.count
    if toPad < 1 {
        return self
    }

    return "".padding(toLength: toPad, withPad: byString, startingAt: 0) + self
  }
}

@discardableResult func shell1(launchPath: String, arguments: [String]) -> String
{
    print(arguments)
    let task = Process()
    task.launchPath = launchPath
    task.arguments = arguments

    let pipe = Pipe()
    task.standardOutput = pipe
    task.launch()

    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    let output = String(data: data, encoding: String.Encoding.utf8)!
    if output.count > 0 {
        //remove newline character.
        // let lastIndex = output.index(before: output.endIndex)
        // print("\(output.startIndex) \(lastIndex)")
        // return output[output.startIndex ..< lastIndex]
        // print(lastIndex)
        task.waitUntilExit()
        return String(output.dropLast())
    }
    task.waitUntilExit()
    return output
}

func shell4(launchPath : String, arguments : [String]) -> (output: [String], error: [String], exitCode: Int32) {

    var output : [String] = []
    var error : [String] = []

    let task = Process()
    task.launchPath = launchPath
    task.arguments = arguments

    let outpipe = Pipe()
    task.standardOutput = outpipe
    let errpipe = Pipe()
    task.standardError = errpipe

    task.launch()

    let outdata = outpipe.fileHandleForReading.readDataToEndOfFile()
    if var string = String(data: outdata, encoding: .utf8) {
        string = string.trimmingCharacters(in: .newlines)
        output = string.components(separatedBy: "\n")
    }

    let errdata = errpipe.fileHandleForReading.readDataToEndOfFile()
    if var string = String(data: errdata, encoding: .utf8) {
        string = string.trimmingCharacters(in: .newlines)
        error = string.components(separatedBy: "\n")
    }

    task.waitUntilExit()
    let status = task.terminationStatus

    return (output, error, status)
}

func bash(_ command: String, arguments: [String]) -> String {
    let whichPathForCommand = shell1(launchPath: "/bin/bash", arguments: [ "-l", "-c", "which \(command)" ])
    return shell1(launchPath: whichPathForCommand, arguments: arguments)
}

func shell2(_ command: String) -> String {
    let task = Process()
    let pipe = Pipe()

    task.standardOutput = pipe
    task.standardError = pipe
    task.arguments = ["-c", command]
    task.launchPath = "/bin/zsh"
    task.launch()

    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    let output = String(data: data, encoding: .utf8)!

    return output
}

@discardableResult func shell3(_ command: String) -> (String?, Int32) {
    let task = Process()

    // task.launchPath = "/bin/zsh"
    // task.arguments = ["-c", command]

    task.launchPath = "/usr/bin/env"
    task.arguments = [command]

    let pipe = Pipe()
    task.standardOutput = pipe
    task.standardError = pipe
    print("about to launch")
    task.launch()
    print("launched")
    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    print("read data")
    let output = String(data: data, encoding: .utf8)
    task.waitUntilExit()
    print("waitUntilExit")
    return (output, task.terminationStatus)
}

// ./ffmpeg -i "CBSRMT 740213 0037 Dig Me Deadly_wbbm_rb.mp3" -vn -acodec copy -ss 00:01:23.775 -to 00:03:27.531 p1.mp3
// ./ffmpeg -i "concat:p1.mp3|p2.mp3|p4.mp3|p5.mp3" -acodec copy p-all.mp3

func secondsToHms(_ seconds: Float) -> String {
  var s = seconds
  let hours = floor(s / 3600)

  s = s - hours * 3600
  let minutes = floor(s / 60)
  s = s - minutes * 60
  return(String(format: "%02d:%02d:%09.6f", Int(hours), Int(minutes), s))
}

func hmsToSeconds(_ hms: String) -> Float {
  let components = hms.components(separatedBy: ":")
  if let hours = Float(components[0]), let minutes = Float(components[1]), let seconds = Float(components[2]) {
    return hours * 3600 + minutes * 60 + seconds
  }
  return 0
}

var outFile = CommandLine.arguments[1]
var outFiles:[String] = []
var outFileCount = 1
var inputFileFile = "" // to be used by concatenation, list of files to concat

let sourceAndTimeFiles = Array(CommandLine.arguments[2...])

// ./ffmpeg -i /Users/nathan/Downloads/CBSRMT-751229-0404-The-Memory-Killers-\(128-44\)_KIXI-\{BoA\}.mp3 -f null -
let (output, error, status) = shell4(launchPath: "/usr/bin/env", arguments: [
  "./ffmpeg", "-y", "-nostdin",
  "-i",
  sourceAndTimeFiles[0],
  "-f",
  "null",
  "-"
])

func getTimeValueFromOutput(from strings: [String]) -> String? {
    let pattern = #"Duration: (\d{2}:\d{2}:\d{2}\.\d{2})"#
    
    for string in strings {
        if let range = string.range(of: pattern, options: .regularExpression) {
            let timeValue = String(string[range])
            return timeValue.replacingOccurrences(of: "Duration: ", with: "")
        }
    }
    
    return nil
}

let lengthInSeconds = hmsToSeconds(getTimeValueFromOutput(from: error) ?? "00:00:00")
if lengthInSeconds == 0 {
  print("Error: cannot get length of source")
  exit(1)
}

for i in stride(from: 0, to: sourceAndTimeFiles.count, by: 2) {
  let sourceFile = sourceAndTimeFiles[i]
  let timesFilePath = sourceAndTimeFiles[i + 1]
  var timeStamps:[String] = []

  do {
    let timesFileContents = try String(contentsOfFile: timesFilePath)
    let timesRows = timesFileContents.split(whereSeparator: \.isNewline)
    var startedAtZero = false

    for row in timesRows {
      let c = row.components(separatedBy: "\t")
      if (c.count > 1) {
        if let start = Float(c[0]), let end = Float(c[1]) {
          if (start > 0.25) {
            if (!startedAtZero) {
              timeStamps.append("00:00:00")
            }
            timeStamps.append(secondsToHms(start))
          }
          startedAtZero = true
          timeStamps.append(secondsToHms(end))
        }
      }
    }
  } catch let err as NSError {
    print(err)
  }
  // print(timeStamps)
  if (timeStamps.count % 2 != 0) {
    timeStamps.append("<end>")
  }
  // print(timeStamps)
  // exit(0)
  // ./ffmpeg -i input.mp3 -ss 00:03:00 -to 00:03:30 -c copy -map 0 output.mp3
  for i in stride(from: 0, to: timeStamps.count, by: 2) {
    let tFile = "/tmp/mtb-temp-\(outFileCount)-\(i).mp3"
    let from = timeStamps[i]
    var arguments = ["./ffmpeg", "-y", "-nostdin", "-i", sourceFile, "-ss", from]
    if (i < timeStamps.count - 1) {
      var to = timeStamps[i + 1]
      var include = true
      if (to != "<end>") {
        arguments = arguments + ["-to", to]
      } else {
        let fromSeconds = hmsToSeconds(from)

        if (lengthInSeconds - fromSeconds) < 3 {
          include = false
        } else {
          to = secondsToHms(lengthInSeconds)
          arguments = arguments + ["-to", to]
        }
      }
      arguments = arguments + ["-c", "copy", "-map", "0"]
      if (include) {
        arguments.append(tFile)
        outFiles.append(tFile)
        inputFileFile = inputFileFile + "file '" + tFile + "'\n"

        let command = "/usr/bin/env " + arguments.joined(separator:" ")
        // print(arguments)
        shell1(launchPath: "/usr/bin/env", arguments: arguments)
      }
    }
  }
  outFileCount = outFileCount + 1
}
let tempDir = NSTemporaryDirectory()
let inputFileFileName = tempDir + "input-files.txt"
do {
  try inputFileFile.write(to: URL(fileURLWithPath: inputFileFileName), atomically: false, encoding: .utf8)
  print("wrote input-files.txt")
  print(inputFileFileName)
  outFiles.append(inputFileFileName)
} catch {
  print("could not write input-files.txt")
  exit(1)
}

if (outFile == "-auto") {
  outFile = sourceAndTimeFiles[0].replacingOccurrences(of: ".mp3", with: " (no ads).mp3")
} else if (CharacterSet.decimalDigits.isSuperset(of: CharacterSet(charactersIn: outFile))) {
  // let episode = String(format: "%04d", Int(outFile))
  let episode = outFile.padLeft(4, with: "0")
  outFile = sourceAndTimeFiles[0].replacingOccurrences(of: ".mp3", with: " (no ads).mp3")
  var components = outFile.components(separatedBy:"/")
  components[components.count - 1] = episode + " " + components[components.count - 1]
  outFile = components.joined(separator: "/")
}

// var timeStamps:[String]
// if (CommandLine.arguments[3] == "00:00:00") {
//   // if we're removing from time 0, just skip to the end
//   timeStamps = Array(CommandLine.arguments[4...])
// } else {
//   // otherwise, start at time 0
//   timeStamps = Array(CommandLine.arguments[3...])
//   timeStamps.insert("00:00:00", at: 0)
// }

// ./ffmpeg -f concat -i test.txt -c copy test-output.mp3
// /usr/bin/env ./ffmpeg -y -nostdin concat -safe 0 -i /var/folders/7n/cclgbgm92v1_cx7d10vgytbr0000gn/T/input-files.txt -c copy /Users/nathan/Projects/web/mystery-theater-browser/tools/0999 CBSRMT-760108-0411-A-Connecticut-Yankee-in-King-Arthur's-Court-(128-44)_KIXI-{BoA} (no ads).mp3
// let arguments = ["./ffmpeg", "-y", "-nostdin", "-i", "concat:" + outFiles.joined(separator:"|"), "-acodec", "copy", outFile]
let arguments = ["./ffmpeg", "-y", "-nostdin", "-f", "concat", "-safe", "0", "-i", inputFileFileName, "-c", "copy", outFile]

let command = "/usr/bin/env " + arguments.joined(separator:" ")
shell1(launchPath: "/usr/bin/env", arguments: arguments)

for removeFile in outFiles {
  shell1(launchPath: "/usr/bin/env", arguments: ["rm", removeFile])
}
print("Wrote " + outFile)

/*
Used https://amiaopensource.github.io/ffmprovisr/#join-trim to use ffmpeg more
correctly. ~~Output files are no longer faulty mp3s.~~ Might be possible to make
a version that can splice different mp3s? See "join files together" in above
link, *this command takes two or more files of different file types…*

No, Audium still chokes on resulting MP3. Not sure why worked in test.

TODO:

- Confirm how to replace file on archive.org
- Find missing data for certain episodes in NRL Ad Free table
- Write a script that:
  1. Downloads original file from Original URL column of table
  2. Creates .txt file from Sections Excluded column
  3. Gets the output file name from the NRL Filename column
  4. Uses the data to run this script
    `./mp3-extract-preferred.swift /target-dir/[outputFileName].mp3 [downloadedOriginal.mp3] [sectionsToExclude.txt]
 */
