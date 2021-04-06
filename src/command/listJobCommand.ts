#!/usr/bin/env node
import { Command } from 'commander';
import { getAllJobs } from '@app/service/JobService';

const program = new Command();

program
  .description('List jobs')
  .action(async options => {
    try {
      const jobs = await getAllJobs();
      console.log(jobs);
      process.exit(0);
    } catch (e) {
      throw e;
    }
  });

program.parse(process.argv);
