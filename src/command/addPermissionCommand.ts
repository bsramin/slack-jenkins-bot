#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import { v5 as uuidv5 } from 'uuid';
import { DateTime } from 'luxon';
import { addPermission } from '@app/service/PermissionService';
import { PermissionInterface } from '@app/interface/PermissionInterface';
import { namespace as permissionNamespace } from '@app/model/Permission';

const program = new Command();

program
  .description('Add permission')
  .action(options => {
    const questions = [
      { type: 'input', name: 'slack_user_id', message: 'Slack user id' },
      { type: 'input', name: 'job_uuid', message: 'The uuid of the Job' },
    ];

    inquirer
      .prompt(questions)
      .then(async answers => {
        try {
          const { slack_user_id, job_uuid } = answers;
          await addPermission(<PermissionInterface>{
            uuid: uuidv5(process.hrtime(), permissionNamespace),
            user_id: slack_user_id,
            job_uuid: job_uuid,
            date_creation: DateTime.now().toSQL({ includeOffset: false }),
          });
          process.exit(0);
        } catch (e) {
          throw e;
        }
      });
  });

program.parse(process.argv);
