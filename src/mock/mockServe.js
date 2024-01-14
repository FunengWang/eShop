import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'
import category from './category.json'

Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
Mock.mock('/mock/category', { code: 200, data: category })
Mock.mock('/mock/user/passcode', { code: 200, data: `${Math.floor(Math.random() * 1000000)}` })