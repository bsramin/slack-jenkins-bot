create table if not exists job
(
    uuid varchar(36) not null primary key,
    slug varchar(32) null,
    job varchar(255) null,
    enabled tinyint(1) null,
    date_creation datetime null,
    constraint job_uuid_uindex
        unique (uuid)
);

create table if not exists permission
(
    uuid varchar(36) not null primary key,
    user_id varchar(255) null,
    job_uuid varchar(36) null,
    date_creation datetime null,
    constraint permission_uuid_uindex
        unique (uuid),
    constraint permission_job_uuid_fk
        foreign key (job_uuid) references job (uuid)
            on update cascade
);

create table if not exists req
(
    uuid varchar(36) not null primary key,
    team_id varchar(32) null,
    team_domain varchar(255) null,
    channel_id varchar(255) null,
    channel_name varchar(32) null,
    user_id varchar(32) null,
    user_name varchar(255) null,
    command varchar(10) null,
    text varchar(255) null,
    response_url varchar(255) null,
    trigger_id varchar(255) null,
    date_creation datetime null,
    constraint req_uuid_uindex
        unique (uuid)
);

create table if not exists build
(
    uuid varchar(36) not null primary key,
    job_uuid varchar(36) not null,
    req_uuid varchar(36) not null,
    date_start datetime not null,
    date_end datetime null,
    build_number int not null,
    constraint build_job_uuid_fk
        foreign key (job_uuid) references job (uuid)
            on update cascade,
    constraint build_req_uuid_fk
        foreign key (req_uuid) references req (uuid)
            on update cascade
);

create index build_job_uuid_index
    on build (job_uuid);

create index build_req_uuid_index
    on build (req_uuid);
