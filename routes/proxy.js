const express = require('express');
const router = express.Router();
const axios = require('axios')
const request = require('request');

const url = 'https://delsol.uy/apisol/'
const cdnUrl = 'http://cdn.dl.uy/solmp3/'

router.get('/programas/:program/:subprogram/contenido/:page', async function(req, res, next) {
    const {program, subprogram, page} = req.params
    const programs = await axios.get(encodeURI(url + `/programas/${program}/${subprogram}/contenido/${page}`))
    res.json(programs.data)
});

router.get('/audio/:id', async function (req,res,next){
    const {id} = req.params
    return request({
        url: cdnUrl + id + '.mp3',
        method: req.query.method
    }).pipe(res);

})

router.get('/programas', async function (req, res) {
    const programs = await axios.get(encodeURI(url + `/programas`))
    res.json(programs.data)
})

router.get('/programas/:id', async function (req, res) {
    const {id} = req.params
    const programs = await axios.get(encodeURI(url + `/programas/${id}`))
    res.json(programs.data)
})

module.exports = router;
