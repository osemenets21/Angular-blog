! ЗАВДАННЯ 
Потрібно реалізувати функціонал як на відео AngularBlog, а саме:

Самі блоги та зареєстровані користувачі мають зберігатися на сервісі, тобто в масивах blogs та users
Блог це об’єкт в якому є наступні властивості: id, postedBy, topic, date, message
Юзер це об’єкт в якому є наступні властивості: id, username, email, password
Юзерів можна реєструвати тільки з унікальними username та email
Юзер може добавляти, видаляти та редагувати свій пост
Адмін може добавляти, видаляти та редагувати свій пост та чужі пости
Пост не має добавлятися з пустими полями


# Task

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
