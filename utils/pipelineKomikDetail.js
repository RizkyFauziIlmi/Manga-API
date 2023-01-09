const makePipelineKomikDetail = (req, res) => {
    const pipeline = []

    // Tambahkan stage $match untuk mencari dokumen yang sesuai dengan kondisi
    if (req.query.q) {
        pipeline.push({
            $match: {
                title: { $regex: new RegExp(req.query.q, 'i') }
            }
        });
    }

    if (req.query.type) {
        pipeline.push({
            $match: {
                type: { $eq: req.query.type }
            }
        })
    }

    if (req.query.genre) {
        // split genreQuery menjadi array jika terdapat lebih dari satu genre
        const genreQuery = req.query.genre.split(',');
        pipeline.push({
            $match: {
                'genre.genre_title': { $all: genreQuery },
            },
        });
    }

    // Tambahkan stage $sort untuk mengurutkan dokumen sesuai dengan kondisi
    if (req.query.sort === 'score') {
        pipeline.push({ $sort: { score: -1 } });
    }

    if (req.query.alphabet === 'az') {
        pipeline.push({ $sort: { title: 1 } });
    } else if (req.query.alphabet === 'za') {
        pipeline.push({ $sort: { title: -1 } });
    }


    // Tambahkan stage $limit untuk membatasi jumlah dokumen yang dikembalikan
    if (req.query.limit) {
        pipeline.push({ $limit: parseInt(req.query.limit) });
    }

    return pipeline
}

export default makePipelineKomikDetail
