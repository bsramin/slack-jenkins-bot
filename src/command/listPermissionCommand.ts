#!/usr/bin/env node
import { Command } from 'commander';
import { getAllpermissions } from '@app/service/PermissionService';

const program = new Command();

program
  .description('List permissions')
  .action(async options => {
    try {
      const jobs = await getAllpermissions();
      console.log(jobs);
      process.exit(0);
    } catch (e) {
      throw e;
    }
  });

program.parse(process.argv);
