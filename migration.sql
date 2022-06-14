CREATE DATABASE IF NOT EXISTS `mini-stile`;
CREATE TABLE users (
  user_id INTEGER NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`)
);

ALTER TABLE users ADD CONSTRAINT MIN_USERNAME CHECK (CHAR_LENGTH(username) >= 1);
ALTER TABLE users ADD CONSTRAINT MIN_EMAIL CHECK (CHAR_LENGTH(email) >= 1);
ALTER TABLE users ADD CONSTRAINT MIN_PASSWORD CHECK (CHAR_LENGTH(password) >= 1)

CREATE TABLE lessons (
  lesson_id INTEGER NOT NULL AUTO_INCREMENT,
  lesson_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (`lesson_id`)
);

CREATE TABLE card_content(
  lesson_id INTEGER NOT NULL,
  text_content VARCHAR(500) NOT NULL,
  image_id INTEGER NOT NULL
);

CREATE TABLE lesson_content(
  lesson_id INTEGER NOT NULL,
  text_content VARCHAR(500) NOT NULL
);

create table images (
  image_id INTEGER AUTO_INCREMENT NOT NULL,
  image_url VARCHAR (2048) NOT NULL,
  description VARCHAR(255),
  PRIMARY KEY (`image_id`)
);

CREATE TABLE img_content (
  image_id INTEGER NOT NULL,
  lesson_id INTEGER NOT NULL
);


insert into images (image_url, description)
values ("https://tinyurl.com/bdhfvf5w", "whale for card");

insert into lessons (lesson_name)
values ("all about killer whales");

insert into card_content (lesson_id, text_content, image_id)
values (
    1,
    "This lesson is about killer whales. In this lesson you will learn about... what are killer whales? what do killer whales sound like? why are killer whales so cute?",
    1
  );

insert into lesson_content (lesson_id, text_content)
VALUES (
    1,
    "in this lesson you must click to draw on a bow tie onto this very cute killer whale!"
  );

insert into images (image_url, description)
values (
    "https://tinyurl.com/4ah3vu9u",
    "whale for lesson"
  );

insert into images (image_url, description)
values (
    "images/kisspng-bow-tie-scalable-vector-graphics-clip-art-portable-png-bowtie-transparent-amp-png-clipart-free-down-5cdf73f01b3a68.9050611015581480801115.png",
    "bowtie for lesson"
  );

insert into img_content (lesson_id, image_id)
VALUES (1, 2);

insert into img_content (lesson_id, image_id)
VALUES (1, 3);

insert into lessons (lesson_name)
values ("all about cats");

insert into images (image_url, description)
values ("https://tinyurl.com/2zzk245y", "cat for card");

insert into card_content (lesson_id, text_content, image_id)
values (
    2,
    "This lesson is about cats. In this lesson you will learn about... what are cats? what do cats sound like? why are cats so cute?",
    4
  );

insert into lesson_content (lesson_id, text_content)
VALUES (
    2,
    "in this lesson you must click to draw on a mustache onto this very cute cat!"
  );

insert into images (image_url, description)
values (
    "https://tinyurl.com/3f44zb63",
    "cat for lesson"
  );

insert into images (image_url, description)
values (
    "https://tinyurl.com/4wp3mrnu",
    "mustache for lesson"
  );

insert into img_content (lesson_id, image_id)
VALUES (2, 5);

insert into img_content (lesson_id, image_id)
VALUES (2, 6);


ALTER TABLE card_content
ADD classification VARCHAR(255);
ALTER TABLE card_content
ADD url VARCHAR(255);

update card_content
SET classification = 'For Students in <br /> Years 7-10';

update card_content
set url = 'all%20about%20killer%20whales'
where lesson_id = 1;

update card_content
set url = 'all%20about%20cats'
where lesson_id = 2;

//new

insert into lessons (lesson_name)
values ("all about dogs"),
  ("all about rabbits"),
  ("all about racoons"),
  ("all about birds"),
  ("all about bees"), 
  ("all about capybaras");

insert into images (image_url, description)
values ("https://tinyurl.com/2kjd6tvj", "dog for card"),
  ("https://tinyurl.com/ycxc34sf", "dog for lesson"),
  ("images/bowtie.png", "bowtie for lesson"),
  (
   "https://tinyurl.com/yc4kwm6s",
    "rabbit for card"
  ),
  (
    "https://tinyurl.com/2p9xfbby",
    "rabbit for lesson"
  ),
  (
    "https://tinyurl.com/4wp3mrnu",
    "mustache for lesson"
  ),
  (
    "https://tinyurl.com/6ywfn2zc",
    "racoon for card"
  ),
  (
    "https://tinyurl.com/4d723mjh",
    "racoon for lesson"
  ),
  ("images/bowtie.png", "bowtie for lesson"),
  ("https://tinyurl.com/2sb3nyvy", "bird for card"),
  (
    "https://tinyurl.com/2p9xjv3z",
    "bird for lesson"
  ),
  (
    "https://tinyurl.com/4wp3mrnu",
    "mustache for lesson"
  ),
  ("https://tinyurl.com/dpw7v8df", "bee for card"),
  ("https://tinyurl.com/yu4uh3hj", "bee for lesson"),
  ("images/bowtie.png", "bowtie for lesson"),
  (
    "https://tinyurl.com/mvfuy369",
    "capybara for card"
  ),
  (
    "https://tinyurl.com/5n8h2582",
    "capybara for lesson"
  ),
  (
    "https://tinyurl.com/4wp3mrnu",
    " mustache for lesson"
  );

insert into card_content (
    lesson_id,
    text_content,
    image_id,
    classification,
    url
  )
values (
    3,
    "This lesson is about dogs. In this lesson you will learn about... what are dogs? what do dogs sound like? why are dogs so cute?",
    7,
    "For Students in <br /> Years 7-10",
    "all%20about%20dogs"
  ),
  (
    4,
    "This lesson is about rabbits. In this lesson you will learn about... what are rabbits? what do rabbits sound like? why are rabbits so cute?",
    10,
    "For Students in <br /> Years 7-10",
    "all%20about%20rabbits"
  ),
  (
    5,
    "This lesson is about raccons. In this lesson you will learn about... what are raccons? what do raccoons sound like? why are raccoons so cute?",
    13,
    "For Students in <br /> Years 7-10",
    "all%20about%20racoons"
  ),
  (
    6,
    "This lesson is about birds. In this lesson you will learn about... what are birds? what do birds sound like? why are birds so cute?",
    16,
    "For Students in <br /> Years 7-10",
    "all%20about%20birds"
  ),
  (
    7,
    "This lesson is about bees. In this lesson you will learn about... what are bees? what do bees sound like? why are bees so cute?",
    19,
    "For Students in <br /> Years 7-10",
    "all%20about%20bees"
  ),
  (
    8,
    "This lesson is about capybaras. In this lesson you will learn about... what are capybaras? what do capybaras sound like? why are capybaras so cute?",
    22,
    "For Students in <br /> Years 7-10",
    "all%20about%20capybaras"
  );


insert into lesson_content (lesson_id, text_content)
VALUES (
    3,
    "in this lesson you must click to draw on a bow tie onto this very cute dog!"
  ),
  (
    4,
    "in this lesson you must click to draw on a mustache onto this very cute rabbit!"
  ),
  (
    5,
    "in this lesson you must click to draw on a bow tie onto this very cute raccoon!"
  ),
  (
    6,
    "in this lesson you must click to draw on a mustache onto this very cute bird!"
  ),
  (
    7,
    "in this lesson you must click to draw on a bow tie onto this very cute bee!"
  ),
  (
    8,
    "in this lesson you must click to draw on a mustache onto this very cute capybara!"
  );
  
insert into img_content (lesson_id, image_id)
VALUES (3, 8),
  (3, 9),
  (4, 11),
  (4, 12),
  (5, 14),
  (5, 15),
  (6, 17),
  (6, 18),
  (7, 20),
  (7, 21),
  (8, 23),
  (8, 24);