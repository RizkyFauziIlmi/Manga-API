import { Router } from 'express'
import komikController from '../controllers/komikController.js';

const route = Router()

route.get('/komik-list', komikController.getKomikList);

route.get('/komik-detail/:endpoint?', komikController.getKomikDetail)

route.get('/komik-chapter/:endpoint?', komikController.getKomikChapter)

route.get('*', (req, res) => {
    res.send({
        documentation: 'https://github.com/RizkyFauziIlmi/Manga-API',
        endpoint: {
            getAllKomikList: "/komik-list",
            getKomikDetail: "/komik-detail/:endpoint?",
            getKomikChapterImage: "/komik-chapter/:endpoint"
        }
    })
})

export default route
