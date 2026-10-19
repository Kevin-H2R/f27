import { score } from './score.js';
import assert from 'node:assert/strict';
// 31yo, STEM bachelor, TOPIK 3, 45M income, no bonus => 23+17+10+40 = 90
assert.equal(score({ age: 31, edu: 'ba_stem', korean: 3, income: 45e6 }).total, 90);
// bonus capped at 40
assert.equal(score({ age: 31, edu: 'none', korean: 0, income: 0, bonusUni: 'top500_phd', bonus: ['allied'], volunteer: 3 }).bonus, 40);
// below min wage => 0 income points; criminal fine >=3M => never passes
assert.equal(score({ age: 27, edu: 'phd_stem', korean: 5, income: 20e6 }).income, 0);
assert.equal(score({ age: 27, edu: 'phd_stem', korean: 5, income: 200e6, dedCrim: 3 }).pass, false);
console.log('ok');
