#!/usr/bin/env node

/**
 * VRT CLI - Command-line tools for Visual Regression Testing
 */

import { Command } from "commander";
import { VRTComparator } from "../comparator.js";
import { VRTPlayer } from "../player.js";

const program = new Command();

program
  .name("vrt")
  .description("Visual Regression Testing tools for terminal UIs")
  .version("1.0.0-alpha.5");

/**
 * Play command - Play back a VRT recording to the terminal
 */
program
  .command("play")
  .description("Play back a VRT recording to the terminal")
  .argument("<file>", "Path to .vrt.json file")
  .option("-s, --speed <number>", "Playback speed multiplier", "1.0")
  .action(async (file: string, options: { speed: string }) => {
    try {
      const player = new VRTPlayer(file);
      const speed = parseFloat(options.speed);

      console.log(`Playing: ${file} (${speed}x speed)\n`);

      await player.play({
        writeToStdout: true,
        speed,
      });

      console.log("\n✓ Playback complete");
    } catch (error) {
      console.error(`Error playing recording: ${error}`);
      process.exit(1);
    }
  });

/**
 * Info command - Display information about a VRT recording
 */
program
  .command("info")
  .description("Display information about a VRT recording")
  .argument("<file>", "Path to .vrt.json file")
  .action((file: string) => {
    try {
      const player = new VRTPlayer(file);
      const metadata = player.getMetadata();
      const dimensions = player.getDimensions();
      const frames = player.getFrames();

      console.log("\nVRT Recording Information");
      console.log("========================\n");

      console.log(`File: ${file}`);
      console.log(`Description: ${metadata.description || "N/A"}`);
      console.log(`Created: ${metadata.createdAt}`);
      console.log(`Duration: ${metadata.duration}ms`);
      console.log(`Dimensions: ${dimensions.cols}x${dimensions.rows}`);
      console.log(`Frame Count: ${frames.length}`);

      // Show frame timestamps
      if (frames.length > 0) {
        console.log("\nFrames:");
        frames.forEach((frame, index) => {
          const size = frame.screenshot.length;
          console.log(`  [${index}] ${frame.timestamp}ms - ${size} bytes`);
        });
      }

      // Show additional metadata
      const customMetadata: Record<string, unknown> = { ...metadata };
      const standardKeys = [
        "createdAt",
        "duration",
        "frameCount",
        "description",
      ];
      standardKeys.forEach((key) => {
        delete customMetadata[key];
      });

      if (Object.keys(customMetadata).length > 0) {
        console.log("\nAdditional Metadata:");
        Object.entries(customMetadata).forEach(([key, value]) => {
          console.log(`  ${key}: ${JSON.stringify(value)}`);
        });
      }

      console.log();
    } catch (error) {
      console.error(`Error reading recording: ${error}`);
      process.exit(1);
    }
  });

/**
 * Compare command - Compare two VRT recordings
 */
program
  .command("compare")
  .description("Compare two VRT recordings")
  .argument("<expected>", "Path to expected .vrt.json file")
  .argument("<actual>", "Path to actual .vrt.json file")
  .option("-t, --threshold <number>", "Difference threshold", "0")
  .option("--ignore-colors", "Ignore ANSI color differences")
  .option("--ignore-whitespace", "Ignore whitespace differences")
  .option("-v, --verbose", "Show detailed differences")
  .action(
    (
      expected: string,
      actual: string,
      options: {
        threshold: string;
        ignoreColors?: boolean;
        ignoreWhitespace?: boolean;
        verbose?: boolean;
      },
    ) => {
      try {
        const result = VRTComparator.compare(expected, actual, {
          threshold: parseInt(options.threshold, 10),
          ignoreColors: options.ignoreColors || false,
          ignoreWhitespace: options.ignoreWhitespace || false,
        });

        console.log("\nVRT Comparison Results");
        console.log("=====================\n");

        console.log(`Expected: ${expected}`);
        console.log(`Actual:   ${actual}\n`);

        console.log(`Total Frames:     ${result.totalFrames}`);
        console.log(`Matched Frames:   ${result.matchedFrames}`);
        console.log(`Different Frames: ${result.differentFrames}`);

        if (result.match) {
          console.log("\n✓ Recordings match!");
          process.exit(0);
        } else {
          console.log("\n✗ Recordings differ!");

          if (result.differentFrameIndices.length > 0) {
            console.log(
              `\nDifferent frame indices: ${result.differentFrameIndices.join(", ")}`,
            );
          }

          // Show detailed differences if verbose
          if (options.verbose && result.differences) {
            console.log("\nDetailed Differences:");
            console.log("====================\n");

            result.differences.forEach((diff) => {
              console.log(`Frame ${diff.frameIndex}:`);
              console.log(`  Expected: ${diff.expected.length} bytes`);
              console.log(`  Actual:   ${diff.actual.length} bytes`);
              console.log(`  Diff:     ${diff.diffCount} characters\n`);

              if (diff.diff) {
                console.log(diff.diff);
                console.log();
              }
            });
          }

          process.exit(1);
        }
      } catch (error) {
        console.error(`Error comparing recordings: ${error}`);
        process.exit(1);
      }
    },
  );

/**
 * Export command - Export VRT recording to image formats
 */
program
  .command("export")
  .description("Export VRT recording to image format (PNG or GIF)")
  .argument("<file>", "Path to .vrt.json file")
  .argument("<output>", "Output file path (.png or .gif)")
  .option("-f, --frame <number>", "Frame index (for PNG export)", "0")
  .option("-s, --speed <number>", "Animation speed for GIF", "1.0")
  .action(async (_file: string, _output: string, _options: unknown) => {
    console.log("\nExport functionality coming soon!");
    console.log("This will export VRT recordings to PNG/GIF format.\n");
    process.exit(1);
  });

program.parse();
