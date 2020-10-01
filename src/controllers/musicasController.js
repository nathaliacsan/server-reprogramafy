const musicas = require("../models/musicas.json")

// map percorre uma lista e retorna ela de acordo com
// a regra que vc colocar
// o map já mapeia e ja retorna, mais pratico do que for
 // map percorra a lista. Para cada musica(item) faça algo
 const novaListaMusicas = musicas.map(musica => {
    const novaMusica = {
        id: musica.id, //acessando a propriedade
        nome: musica.name,
        amostra: musica.preview_url,
        nome_album: musica.album.name,
        imagem: musica.album.url,
        artista: musica.artists.name   
    }
    
    return novaMusica

  })
    
const getMusicas = (request,response) => {
    console.log(request.url)
    response.status(200).send(novaListaMusicas)

}

const getMusicasById = (request, response) => {
    const id = request.params.id
    const musicaFiltrada = novaListaMusicas.find(musica => musica.id == id)
    if (musicaFiltrada) {
        response.status(200).send(musicaFiltrada)
    } else {
        response.status(404).send("Id não encontrado")
    }
      
}

// --------- FILTRO ARTISTAS 
const listaArtistas = musicas.map(item => {
    return {
        id: item.artists.id,
        nome: item.artists.name   
    }

  })

const getArtistas = (request, response) => {
    const listaSemRepetir = []

    listaArtistas.forEach(artista => {
        const encontrei = listaSemRepetir.find(item => item.id == artista.id)
        if (!encontrei) {
            listaSemRepetir.push(artista)
        }
    })

    response.status(200).send(listaSemRepetir)
        
}

// ------------ MUSICAS DO ARTISTA

const listaMusicas = musicas.map(musica => {
    const novaMusica = {
        id: musica.id,
        nome: musica.name,
        amostra: musica.preview_url,
        nome_album: musica.album.name,
        imagem: musica.album.url,
        artista: musica.artists.name,
        duracao: musica.duration_ms
    }
    return novaMusica
})

const getArtistabyId = (request, response) => {
    const id = request.params.id
    const artista = listaArtistas.find(artista => artista.id == id)
    
    if (artista) {

        const musicas = listaMusicas.filter(item => item.artista == artista.nome)
    
        const novoArtista = {
            id: artista.id,
            nome: artista.nome,
            musicas: musicas
        }
        console.log(novoArtista)
        response.status(200).send(novoArtista)
    } else {
        response.status(404).send("Artista não encontrada!")
    }
}

// ------------- PEGAR ALBUNS

const listarAlbuns = musicas.map(musica => {

    const album = {
        id: musica.album.id,
        nome: musica.album.name,
        data_lancamento: musica.album.release_date,
        total_musicas: musica.album.total_tracks,
        imagem: musica.album.url
    }

    return album
})


const getAlbuns = (request, response) => {
    let listaSemRepetir = []

    listarAlbuns.forEach(album => {
        if (!listaSemRepetir.find(item => item.id === album.id)) {
            listaSemRepetir.push(album)
        }
    })

    response.status(200).send(listaSemRepetir)
}

const getAlbumPorNome = (request, response) => {
    const nome = request.params.nome

        // listarAlbuns.find(album => {

        //     const minusculas = album.nome.toLowerCase()
        //     const separarPorEspaco = minusculas.split(' ')
        //     const juntarPorHifen = separarPorEspaco.join('-')
        // })

    const musicasAlbum = listaMusicas.filter(musica => {
        return musica.nome_album.toLowerCase().split(' ').join('-') === nome
    })    

    const album  = listarAlbuns.find(album => {
        return album.nome.toLowerCase().split(' ').join('-') === nome
    })

    const novoAlbum = {
        // album é a const album ali de cima
        id: album.id,
        nome: album.nome,
        data_lancamento: album.data_lancamento,
        total_musicas: album.total_musicas,
        imagem: album.imagem,
        musicas: musicasAlbum
    }

    response.status(200).send(novoAlbum)
}

module.exports = {
    getMusicas,
    getMusicasById,
    getArtistas,
    getArtistabyId,
    getAlbuns,
    getAlbumPorNome
}