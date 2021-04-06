#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import { addJob } from '@app/service/JobService';
import { JobInterface } from '@app/interface/JobInterface';
import { v5 as uuidv5 } from 'uuid';
import { namespace as reqNamespace } from '@app/model/Req';
import { DateTime } from 'luxon';

const program = new Command();

program
  .description('Create a new job')
  .action(options => {
    const questions = [
      { type: 'input', name: 'job_slug', message: 'The slug for the Job' },
      { type: 'input', name: 'job_name', message: 'The complete name of the Job in Jenkins' },
    ];

    inquirer
      .prompt(questions)
      .then(async answers => {
        try {
          const { job_slug, job_name } = answers;
          await addJob(<JobInterface>{
            uuid: uuidv5(process.hrtime(), reqNamespace),
            slug: job_slug,
            job: job_name,
            enabled: true,
            date_creation: DateTime.now().toSQL({ includeOffset: false }),
          });
          process.exit(0);
        } catch (e) {
          throw e;
        }
      });
  });

program.parse(process.argv);
