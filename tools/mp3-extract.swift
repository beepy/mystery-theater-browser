#!/usr/bin/swift
print("""
Usage: ./mp3-extract.swift <in.mp3> <out.mp3 or -auto> <hh:mm:ss.tt> <hh:mm:ss.tt> ...
This tool takes an mp3 input file and a series of time values indicating
portions you wish to EXCLUDE from the final recording, such as ads. Using
ffmepg, it extracts the time periods specified without re-encoding them, and
concats them into a single new file.
""")

import Foundation

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

let sourceFile = CommandLine.arguments[1]
var outFile = CommandLine.arguments[2]

if (outFile == "-auto") {
  outFile = sourceFile.replacingOccurrences(of: ".mp3", with: " (no ads).mp3")
}
print(CommandLine.arguments[3...])

var timeStamps:[String]
if (CommandLine.arguments[3] == "00:00:00") {
  timeStamps = Array(CommandLine.arguments[4...])
} else {
  timeStamps = Array(CommandLine.arguments[3...])
  timeStamps.insert("00:00:00", at: 0)
}
print(timeStamps)

var outFiles:[String] = []

for i in stride(from: 0, to: timeStamps.count, by: 2) {
  let tFile = "/tmp/mtb-temp\(i).mp3"
  let from = timeStamps[i]
  var arguments = ["./ffmpeg", "-i", sourceFile, "-vn", "-acodec", "copy", "-ss", from, "-y", "-nostdin"]
  if (i < timeStamps.count - 1) {
    let to = timeStamps[i + 1]

    arguments = arguments + ["-to", to]
  }
  arguments.append(tFile)
  let command = "/usr/bin/env " + arguments.joined(separator:" ")
  let o1 = shell1(launchPath: "/usr/bin/env", arguments: arguments)
  outFiles.append(tFile)
}
let arguments = ["./ffmpeg", "-y", "-nostdin", "-i", "concat:" + outFiles.joined(separator:"|"), "-acodec", "copy", outFile]
let command = "/usr/bin/env " + arguments.joined(separator:" ")
shell1(launchPath: "/usr/bin/env", arguments: arguments)
for removeFile in outFiles {
  shell1(launchPath: "/usr/bin/env", arguments: ["rm", removeFile])
}
