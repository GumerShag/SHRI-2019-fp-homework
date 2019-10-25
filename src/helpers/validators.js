/* 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если функции будут написаны руками (без использования библиотеки) это не является ошибкой, например:
 *
 * const greaterThenOne = x => x > 1;
 * const length = x => x.length;
 * const lengthGreaterThenOne = compose(greaterThenOne, length);
 * Это — ок.
 *
 * Вот такая запись не очень хорошая, все таки потренируйтесь составлять композиции:
 * const lengthGreaterThenOne = x => x.length > 1;
 */

import {replace, length, compose, test, allPass, lt, gt, all, contains, includes, match, anyPass} from 'ramda';

const replaceNumbers = replace(/[^0-9]/g, '');

const getNumbersCount = compose(length, replaceNumbers);

const containsOnlyEng = test(/^[a-zA-Z0-9.+]+$/);

const getNumbers = str => match(/[0-9]/g, str);
const getFour = str => match(/4/g, str);
const getSeven = str => match(/7/g, str);

const valueGtOne = value => gt(value, 1);
const valueGtTwo = value => gt(value, 2);
const valueLtTwo = value => lt(value, 2);
const valueLtFive = value => lt(value, 5);
const valueGtFive = value => gt(value, 5);
const valueLtTen = value => lt(value, 10);
const valueGtThree = value => gt(value, 3);
const valueGtEight = value => gt(value, 8);
const valueLtEight = value => lt(value, 8);
const valueGtFour = value => gt(value, 4);
const valueLtFour = value => lt(value, 4);
/**
 * Функции для проверки выполнения условий с количеством цифр в строке
 */
const numbersCountGtTwo = compose(valueGtTwo, length, getNumbers);
const numbersCountLtTwo = compose(valueLtTwo, length, getNumbers);
const numbersCountGtOne = compose(valueGtOne, length, getNumbers);
const numbersCountGtThree = compose(valueGtThree, length, getNumbers);
const numbersCountLtFive = compose(valueLtFive, length, getNumbers);
const numbersCountGtFour = compose(valueGtFour, length, getNumbers);

/**
 * Функции для проверки выполнения условий с длиной строки
 */
const lengthLtFive = compose(valueLtFive, length);
const lengthGtFive = compose(valueGtFive, length);
const lengthLtTen = compose(valueLtTen, length);
const lengthGtEight = compose(valueGtEight, length);
const lengthLtEight = compose(valueLtEight, length);
const lengthLtFour = compose(valueLtFour, length);
/**
 * Функции для проверки наличия конкретного символа в строке
 */
const equalsOne = value => value === 1;
const equalsZero = value => value === 0;
const notEqualsZero = value => value !== 0;

const containsOneFour = compose(equalsOne, length, getFour);
const notContainsFour = compose(equalsZero, length, getFour);
const containsSeven = compose(notEqualsZero, length, getSeven);


// 1. Длина < 5 и кол-во цифр > 2 шт.
export const validateFieldN1 = allPass([numbersCountGtTwo, lengthLtFive]);

// 2. Длина < 5 и кол-во цифр < 2 шт.
export const validateFieldN2 = allPass([numbersCountLtTwo, lengthLtFive]);

// 3. Длина > 5 или кол-во цифр > 1 шт.
export const validateFieldN3 = allPass([numbersCountGtOne, lengthGtFive]);

// 4. Длина < 10 и кол-во цифр > 2 шт. и одна из цифр равна "4"
export const validateFieldN4 = allPass([lengthLtTen, numbersCountGtTwo, containsOneFour]);

// 5. Длина < 10 и кол-во цифр > 1 шт. и ни одна из цифр не равна "4"
export const validateFieldN5 = allPass([lengthLtTen, numbersCountGtOne, notContainsFour]);

// 6. Длина > 5, или одна из цифр равна "7"
export const validateFieldN6 = anyPass([lengthGtFive, containsSeven]);

// 7. Длина > 8 и кол-во цифр > 3 шт. и только англ
export const validateFieldN7 = allPass([lengthGtEight, numbersCountGtThree, containsOnlyEng]);

// 8. Кол-во цифр < 5 шт. или только англ или одна из цифр равна "7"
export const validateFieldN8 = anyPass([numbersCountLtFive, containsOnlyEng, containsSeven]);

// 9. Длина < 8, кол-во цифр > 4 шт. только англ
export const validateFieldN9 = allPass([lengthLtEight, numbersCountGtFour, containsOnlyEng]);

// 10. Длина < 4 или кол-во цифр > 2 шт. или только англ
export const validateFieldN10 = anyPass([lengthLtFour, numbersCountGtTwo, containsOnlyEng]);
