# Vite-html-academy-2024

## 1. Введение

### 1.1. Что такое Vite

### 1.2. Vite CLI

Создадим проект на Vite: npm create vite@latest
Если фреймворк не нужен, выбираем вариант Vanilla.
Далее Vite предложит выбрать между TypeScript и JavaScript.
После этого в текущей директории появится папка с проектом. Останется зайти в неё и установить все необходимые компоненты через команду npm i. Об этом сообщит сам Vite.
Запустить dev-сборку можно командой npm run dev
npm run preview — соберёт проект в папку dist и поднимет локальный сервер для просмотра результата.
 
### 1.3. Основные возможности Vite

Vite использует HMR в связке с ESM.

    <script type="module" src="/index.js"></script>

Скрипты подключаются с обязательным указанием type="module".
Vite по умолчанию поддерживает импорт JSON-файлов. Это означает, что можно импортировать JSON-файл так же, как и любой другой модуль:

    import data from "./data.json";
    console.log(data);

Аналогично можно подключать и стили CSS

    import "./style.css";

Вы можете подключить стили как обычно — в теге <head>.

Vite также поддерживает CSS Modules. Чтобы их использовать, нужно добавить в название CSS-файла расширение .module.css, например, styles.module.css.

    /* styles.module.css */
    .container {
    background-color: #f0f0f0;
    }

Затем импортировать эти стили в компонент:

    import styles from "./styles.module.css";

    function Header() {
    return <div class={styles.container}>Hello, Vite!</div>;
    }

    export default Header;

Чтобы получить оптимизированный код, который работает в старых версиях браузеров, JavaScript необходимо пропустить через транспилятор и минификатор. Для этих целей обычно используются такие инструменты, как Babel и Terser.

В конфигурационном файле Vite легко настроить эти процессы. Например, можно указать параметр minify в значение esbuild или terser, указав тем самым, что будет отвечать за минификацию.

Vite полностью поддерживает TypeScript без дополнительной конфигурации. Достаточно создать файлы с расширением .ts или .tsx.

    interface User {
    name: string;
    age: number;
    }

    const user: User = {
    name: "Михаил",
    age: 30,
    };

    console.log(user);

Vite позволяет импортировать статические файлы прямо в JS-код. Например:

    import image from "./img.png";

Теперь переменная image содержит путь до изображения, и её можно подставить в атрибут src там, где это необходимо.

В момент сборки Vite добавит таким импортам параметр ?import к концу URL-строки. Это можно увидеть с помощью плагина vite-plugin-inspect. Плагин позволяет поэтапно рассмотреть все трансформации файлов при сборке.

Можно собрать все файлы, которые не используются в разработке, например, фавиконки, в папку public. Всё, что лежит в этой папке, Vite перенесет в корень папки dist как есть.
Обратите внимание, что файлы из папки public нельзя импортировать в JS-код.

Для картинки из папки src/img/picture1.jpg ты можешь использовать:

    import vitePicture from './img/picture1.jpg';

Для картинки из папки public/img/picture2.jpg ты не можешь использовать import, только прямую ссылку в HTML:

    <img src="/img/picture2.jpg" alt="Picture 2">

Имя папки по умолчанию public, но его можно менять. Чтобы Vite понимал, в какой папке хранятся подобные ресурсы, необходимо создать конфигурационный файл vite.config.js и вписать в него следующее:

    export default {
    publicDir: "<имя папки>",
    };

### 1.4. Zero-config сборка

Чтобы при вызове команды npm run dev сразу открывался браузер, добавим в package.json параметр --open.

    "scripts": {
        "dev": "vite --open",
        ...
    },

### 1.5. Задание: создаём проект с Vite (Практика 1 )

## 2. Конфигурация Vite

### Погружаемся в настройки Vite

#### 2.1. Структура файлов проекта

##### Файлы

- index.html — входная точка. Место, в котором подключается скрипт index.js.
- index.js — скрипт, в котором импортируются стили и изображения, а вёрстка собирается и вставляется в index.html.
- counter.js — этот модуль экспортирует функционал, который затем используется в index.js.
- style.css — стили, которые забирает скрипт в index.js и затем вставляет в тег `<style>`.
- package.json и package.lock — файлы, созданные в процессе установки зависимостей и содержащие информацию о них.
- Файлы index.js и counter.js созданы для примера. Хранить их в проекте вовсе не обязательно.

В public принято складывать статические файлы — они не используются в процессе разработки, не импортируются в стили или скрипты, но необходимы в production-сборке проекта. 
Хорошие примеры таких файлов — favicon, minifest.webmanifect, robots.txt. 

Статические файлы в Vite обладают следующими особенностями:

В режиме dev-сборки статические файлы доступны по URL вида /filename.ext

- Согласно документации, эти файлы не могут быть импортированы в JavaScript-код. 
- Имена статических файлов из папки public не хешируются. Это значит, что в любом режиме сборки к файлу не будет добавлен хеш в виде префикса или постфикса, как это происходит в случае со скриптами.

##### Корневая директория

В Vite опция rootDir, или root, позволяет задать для проекта корневую директорию.
По умолчанию она устанавливается в текущей рабочей директории, где запускается Vite.
Меняют корневую директорию в случае нестандартной структуры проекта.
Вот пример использования опции root в vite.config.js:

    import { defineConfig } from "vite";

    export default defineConfig({
    root: "src",
    });

##### Конфигурационный файл

    export default {
    //options
    };

Воспользуйтесь функцией defineConfig(), чтобы в вашей IDE работали подсказки опций при заполнении конфига. Выглядит это так:

    import { defineConfig } from "vite";

    export default defineConfig({
    // options
    });

Вы можете задать имя конфигу по своему желанию или использовать несколько конфигов. В таком случае при вызове команды надо будет добавить параметр --config с указанием имени файла. Например: vite --config custom-config.js

Попробуем задать новое название для папки, в которой будут храниться статические файлы.

    import { defineConfig } from "vite";

    export default defineConfig({
    publicDir: "static",
    });

Теперь можно переименовать папку public на static. Логика сборки останется такой же.

##### Способы организации файловой структуры

src
--assets
    --img
    --svg
    --js
        --libs
        --components
        --utils
    --styles
        --components

#### 2.2. Стили

Подключать стили можно с помощью тега link. Также можно импортировать их в JS-файл, при этом все стили подключаются в теге `<style>` в `head` страницы.
импорт обычных CSS-файлов.

    import "./assets/styles/style.css";

Вы можете использовать несколько параметров при импорте CSS. Например, можно в конце пути файла указать ?inline. Тогда стили будут записаны строкой в переменную, а не будут вставляться в head страницы.

    import buttonStyles from "./assets/styles/style.css?inline";

    console.log(buttonStyles);

##### PostCSS

Vite также поддерживает PostCSS-модули и PostCSS-плагины. Например, плагин autoprefixer генерирует префиксы для кроссбраузерности стилей.

    npm install -D postcss autoprefixer

Установим плагин, а затем подключим его в наш конфиг:

    import { defineConfig } from "vite";
    import autoprefixer from "autoprefixer";

    export default defineConfig({
    css: {
        postcss: {
        plugins: [
            autoprefixer({
            //options
            }),
        ],
        },
    },
    });

При желании можно добавить опции для более гибкой настройки префиксера. Аналогично можно установить любой другой PostCSS-плагин и подключить его в конфигурационном файле Vite.
Vite поддерживает Lightning CSS из коробки, поэтому необходимости в PostCSS практически нет. Lightning CSS покрывает множество правил из PostCSS.

[Официальный сайт Lightning CSS](https://lightningcss.dev/)

##### Препроцессоры

Vite поддерживает несколько препроцессоров:

- Sass;
- LESS;
- Stylus.

Для использования препроцессора достаточно его установить.

    npm add -D sass

Далее меняем расширение стилевого файла, который импортируется в index.js с css на scss. 

    <link rel="stylesheet" href="./assets/styles/main.scss">

или

    import './style.css' (в файле main.js)

При таком подходе Vite сделает следующие шаги:

1. запросит содержимое SCSS-файла с сервера;
2. скомпилирует из него CSS;
3. скомпилирует полученное в ES-модуль, который подключает итоговые стили в тег `<style>`.

##### Tailwind CSS

[Установка Tailwind CSS с помощью Vite](https://tailwindcss.com/docs/guides/vite)

использует подход под названием «атомарный css».

    <div class="mx-auto flex flex-col"></div>

Эти классы добавят margin-left: auto, margin-right: auto, display: flex и flex-direction: column к диву.

Установить необходимые пакеты:

    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

Команды сгенерируют конфигурационный файл tailwind.config.js с таким содержимым:

    export default {
    content: ["./index.html", "./**/*.{js}"],
    theme: {
        extend: {},
    },
    plugins: [],
    };

В свойстве content указываем пути к файлам, где используются tailwind-классы.

Пропишем необходимые директивы в стилевом файле, подключенном к странице.

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

Необходимые директивы в стилевом файле нужны для того, чтобы активировать генерацию базовых стилей, компонентов и утилит Tailwind CSS. Это ключевой шаг, который сообщает Tailwind, какие стили он должен включить в ваш проект.

После перезапуска сборки мы можем пользоваться tailwind-классами в разметке.

##### Минификация

Скомпилированные стили можно минифицировать, чтобы облегчить стилевой файл и ускорить загрузку страницы.
При работе с JavaScript помимо этого можно транспилировать код, чтобы он работал в старых версиях браузеров.
В Gulp и Webpack для этих целей используют внешние пакеты-плагины, а с Vite всё проще. Укажем в конфигурационном файле следующие опции:

    import { defineConfig } from "vite";

    export default defineConfig({
    build: {
        minify: true,
    },
    });

Эта опция включает транспиляцию JavaScript и минификацию CSS.
Значение true является значением по умолчанию, его можно не указывать.
Также по умолчанию транспиляцией занимается ESBuild.

Vite предоставляет возможность настроить параметры минификации отдельно для JS и для CSS. Опция cssMinify отвечает за параметры минификации CSS.

    import { defineConfig } from "vite";

    export default defineConfig({
    build: {
        minifyCSS: "esbuild/lightningcss",
    },
    });

В вашем коде есть небольшая ошибка в названии опции для минификации CSS. Правильная опция для минификации CSS — это cssMinify, а не minifyCSS.

#### 2.3. Работа с графикой

Картинку можно импортировать в JS-код и добавить его в разметку страницы.

    import image from "./../images/01.jpg";

    const createImageElement = (src, alt, sizes) => {
    const element = document.createElement("img");
    element.src = src;
    element.alt = alt;
    element.width = sizes[0];
    element.height = sizes[1];
    return element;
    };

    const imageElement = createImageElement(image, "Описание", [500, 350]);
    document.querySelector(".image-wrapper").append(imageElement);

Такой подход к импорту ассетов можно условно назвать JavaScript-ориентированным, когда подавляющую часть страницы собирает JS-код. 

Также можно писать разметку в HTML-файлах и встраивать ассеты вручную.

    <img src="./../images/01.jpg" width="200" height="150" alt="alt text">

##### Оптимизация изображений в Vite

Для уменьшения веса картинок используем плагин vite-plugin-image-optimizer.
Внутри плагина используются популярные библиотеки SVGO и Sharp.js.
[Документация по работе с плагином vite-plugin-image-optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer)

**Предупреждение**

sharpи svgoне устанавливаются как часть пакета. Вам придется установить их вручную и добавить как зависимость разработки. Это решение было принято дизайнером, поэтому вы можете пропустить установку, sharp если хотите оптимизировать только ресурсы svg с помощью svgoи наоборот.

    npm install sharp --save-dev
    npm install svgo --save-dev

Подключим плагин в vite.config.js. Импортируем плагин, прописываем его в поле pligins и передаём необходимые настройки.

    import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
    import { defineConfig } from "vite";

    export default defineConfig(() => {
    return {
        plugins: [
        ViteImageOptimizer({
            // options will be here..
        }),
        ],
    };
    });

В опциях укажем расширения изображений и на сколько будем их ужимать.

    ViteImageOptimizer({
    jpg: {
        quality: 75,
    },
    png: {
        quality: 75,
    },
    });

##### Создание SVG-спрайта

Для спрайта используем плагин vite-plugin-svg-spriter, его просто настроить и использовать.

    npm i vite-plugin-svg-spriter

Уже знакомым способом добавляем спрайт в конфиг.
В качестве опций передадим только svgFolder, где будет указан путь до папки с иконками, которые нужно включить в спрайт.

    import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
    import createSvgSpritePlugin from "vite-plugin-svg-spriter";

    export default defineConfig({
    plugins: [
        ViteImageOptimizer({
        jpg: {
            quality: 15,
        },
        png: {
            quality: 75,
        },
        }),
        createSvgSpritePlugin({
        svgFolder: "./assets/images/svg/",
        }),
    ],
    });

В dev-сборке и в production-сборке плагин встроит инлайновый спрайт в разметку. Обращаться к иконкам при этом можно будет следующим образом:

    <svg>
    <use href="#htmlacademy">
    </svg>

Плагин можно настроить под себя более гибко. Например, выбрать место, куда он будет вставлять собранный спрайт. Все опции можно посмотреть в [документации](https://www.npmjs.com/package/vite-plugin-svg-spriter)

##### Генерация WebP

Для создания WebP в сборке на Vite существуют плагины, но они могут работать некорректно.
В репозитории Awesome Vite вы найдете несколько плагинов, связанных с WebP.

Например, связка vite-plugin-imagemin и imagemin-webp.

    npm install vite-plugin-imagemin imagemin-webp --save-dev

Конфигурация:

    import { defineConfig } from "vite";
    import viteImagemin from "vite-plugin-imagemin";
    import imageminWebp from "imagemin-webp";

    export default defineConfig({
    plugins: [
        viteImagemin({
        gifsicle: {
            optimizationLevel: 7,
            interlaced: false,
        },
        optipng: {
            optimizationLevel: 7,
        },
        mozjpeg: {
            quality: 20,
        },
        pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
        },
        svgo: {
            plugins: [
            {
                name: "removeViewBox",
            },
            {
                name: "removeEmptyAttrs",
                active: false,
            },
            ],
        },
        webp: imageminWebp({
            quality: 75,
        }),
        }),
    ],
    });

Когда вы используете плагины, такие как vite-plugin-imagemin и imagemin-webp, для генерации WebP-версий изображений, вы можете настроить разметку таким образом, чтобы использовать WebP в поддерживаемых браузерах, но при этом обеспечивать запасной вариант для браузеров, которые не поддерживают WebP.

    <picture>
    <!-- WebP версия -->
    <source srcset="/path/to/image.webp" type="image/webp">
    
    <!-- Запасная версия -->
    <img src="/path/to/image.jpg" alt="Описание изображения">
    </picture>

#### 2.4. Сборка мультистраничного сайта

Редактируем конфигурационный файл
Укажем несколько входных точек нашей сборки. Нам понадобится опция build и вложенная опция rollupOptions.
Дополним файл vite.config.js

    import { defineConfig } from "vite";

    export default defineConfig(() => {
    return {
        build: {
        rollupOptions: {
            input: {
            index: "index.html",
            about: "./pages/about/index.html",
            contacts: "./pages/contacts/index.html",
            },
        },
        },
    };
    });

Обратите внимание, что главную страницу мы оставляем в корне. Она может быть разводящей страницей, которая содержит в себе ссылки на все остальные страницы проекта.
Чтобы обозначить в путях текущую директорию, рекомендуется использовать встроенный в Node.js модуль path и его функцию resolve(). Это гарантирует нам правильный путь.

    import { defineConfig } from "vite";
    import { resolve } from "path";

    export default defineConfig(() => {
    return {
        build: {
        rollupOptions: {
            input: {
            index: resolve(__dirname, "index.html"),
            about: resolve(__dirname, "pages/about/index.html"),
            contacts: resolve(__dirname, "pages/contacts/index.html"),
            },
        },
        },
    };
    });

Файловая структура будет выглядеть следующим образом:

pages
--about
----index.html
----index.js
----style.scss
--contacts
----index.html
----index.js
----style.scss

index.html

##### Переход между страницами

На странице index.html можно составить список всех страниц проекта.

    <ol>
        <li>
        <a href="/pages/about/">О нас</a>
        </li>

        <li>
        <a href="/pages/contacts/">Контакты</a>
        </li>
    
        <li>
        <a href="/pages/articles/">Статьи</a>
        </li>
    </ol>

На самих же внутренних страницах переход на другую страницу будет выглядеть так:

    <a href="/pages/contacts/">Контакты</a>

##### Изолированность стилей и скриптов на страницах

Одним из преимуществ описанного нами подхода является возможность подключить к странице только те стили и скрипты, которые необходимы для этой страницы.

##### Транспиляция по умолчанию

Напишем JS-код с использованием оператора опциональной последовательности — ?.. Он позволяет получить доступ к несуществующему свойству без появления ошибки. Этот оператор появился недавно, поэтому не все браузеры его поддерживают.
Пример

    const Person = {
    name: 'Emily',
    age: 22,
    address:
    {
    street: 'Green street'
    }}

    const city = Person.address?.city;
    console.log(city);

Что это даёт - Vite самостоятельно обнаружит экспериментальную технологию, найдёт и применит к ней полифилл. Такой код будет работать в старых браузерах. Под капотом Vite использует esbuild.
В конфиге можно выбрать для транспиляции другой бандлер — terser, однако он значительно медленнее.

##### Сорсмапы

Сорсмап — «карты», которые пригодятся при отладке кода. Благодаря им легко понять, в каком файле лежат стили или скрипты.
Добавим в конфиг опцию build.sourcemap со значением true.

    export default defineConfig({
    build: {
        sourcemap: true,
    },
    });

## Остановился на 2.8. Задание: пишем сборку многостраничного сайта на Vite

https://up.htmlacademy.ru/vite/1/tasks/2