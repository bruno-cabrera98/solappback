const express = require('express');
const router = express.Router();
const axios = require('axios')
const request = require('request');

const url = 'https://delsol.uy/apisol/'
const cdnUrl = 'http://cdn.dl.uy/solmp3/'

router.get('/programas/:program/:subprogram/contenido/:page', async function(req, res, next) {
    const {program, subprogram, page} = req.params
    const programs = await axios.get(url + `/programas/${program}/${subprogram}/contenido/${page}`)
    res.json(programs.data)
});

router.get('/audio/:id', async function (req,res,next){
    const {id} = req.params
    return request({
        url: cdnUrl + id + '.mp3',
        method: req.query.method
    }).pipe(res);

})

module.exports = router;
