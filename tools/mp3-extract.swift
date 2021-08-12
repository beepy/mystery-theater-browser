#!/usr/bin/swift
print("""
Usage: ./mp3-extract.swift <in.mp3> <out.mp3|-auto|episode #> <times.txt>
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

func shell1(launchPath: String, arguments: [String]) -> String
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
        return String(output.dropLast())
    }
    return output
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

let sourceFile = CommandLine.arguments[1]
var outFile = CommandLine.arguments[2]
let timesFilePath = CommandLine.arguments[3]
var timeStamps:[String] = []

do {
  let timesFileContents = try String(contentsOfFile: timesFilePath)
  let timesRows = timesFileContents.split(whereSeparator: \.isNewline)

  for row in timesRows {
    let c = row.components(separatedBy: "\t")
    if (c.count > 1) {
      if let start = Float(c[0]), let end = Float(c[1]) {
        if (start > 0) {
          timeStamps.append(secondsToHms(start))
        }
        timeStamps.append(secondsToHms(end))
      }
    }
  }
} catch let err as NSError {
  print(err)
}
print(timeStamps)
if (outFile == "-auto") {
  outFile = sourceFile.replacingOccurrences(of: ".mp3", with: " (no ads).mp3")
} else if (CharacterSet.decimalDigits.isSuperset(of: CharacterSet(charactersIn: outFile))) {
  // let episode = String(format: "%04d", Int(outFile))
  let episode = outFile.padLeft(4, with: "0")
  outFile = sourceFile.replacingOccurrences(of: ".mp3", with: " (no ads).mp3")
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

var outFiles:[String] = []

for i in stride(from: 0, to: timeStamps.count, by: 2) {
  let tFile = "/tmp/mtb-temp\(i).mp3"
  let from = timeStamps[i]
  var arguments = ["./ffmpeg", "-i", sourceFile, "-vn", "-acodec", "copy", "-ss", from, "-y", "-nostdin"]
  if (i < timeStamps.count - 1) {
    let to = timeStamps[i + 1]

    arguments = arguments + ["-to", to]
    arguments.append(tFile)
    let command = "/usr/bin/env " + arguments.joined(separator:" ")
    let o1 = shell1(launchPath: "/usr/bin/env", arguments: arguments)
    outFiles.append(tFile)
  }
}
let arguments = ["./ffmpeg", "-y", "-nostdin", "-i", "concat:" + outFiles.joined(separator:"|"), "-acodec", "copy", outFile]
let command = "/usr/bin/env " + arguments.joined(separator:" ")
shell1(launchPath: "/usr/bin/env", arguments: arguments)
for removeFile in outFiles {
  shell1(launchPath: "/usr/bin/env", arguments: ["rm", removeFile])
}
print("Wrote " + outFile)
