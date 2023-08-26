create database if not exists rise_blog_db;

create table users(
    id integer primary key generated always as identity,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(50) unique not null,
    password varchar not null,
    gender varchar not null,
    created_on timestamp not null
);

create table posts(
    postId integer primary key generated always as identity,
    userId int references users(id) on delete cascade,
    post text not null,
    created_on timestamp not null,
    updated_on timestamp
);

create table comments(
    commentId integer primary key generated always as identity,
    postId int references posts(postId) on delete cascade,
    userId int references users(id) on delete cascade,
    comment text not null,
    created_on timestamp not null
);

-- Indexes
CREATE INDEX idx_posts_userId ON posts(userId);
CREATE INDEX idx_posts_postId ON posts(postId);

CREATE INDEX idx_comments_postId ON comments(postId);
CREATE INDEX idx_comments_userId ON comments(userId);