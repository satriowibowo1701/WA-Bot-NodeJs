import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth, MessageMedia, Buttons, List } = pkg;
import dotenv from 'dotenv'
dotenv.config()
import pkgai from "openai";
const { Configuration, OpenAIApi } = pkgai;
import pkgenv from 'process';
const { exit } = pkgenv;
import fetch from 'node-fetch';
import fs from 'fs';
import bad from 'indonesian-badwords'

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);


const client = new Client({
    authStrategy: new LocalAuth({
        clientId: process.env.SESSION_USER,
        dataPath: "./Session-" + process.env.SESSION_USER,
    })
}
)

// Save session values to the file upon successful auth
function Tes() {
    client.on('authenticated', () => {
        console.log("autentikasi successful")
    });

    client.initialize();

    client.on("qr", qr => {
        qrcode.generate(qr, { small: true });
    })

    client.on('ready', () => {
        console.log("ready to message")
    });
    client.on('message', async message => {
        let cachebackup
        let cacheongkir
        let listongkir = ["jnt",
            "wahana",
            "tiki",
            "trawlbens",
            "sicepat",
            "ncs",
            "lion",
            "jne",
            "anteraja"]
        if (await !fs.existsSync('./assets/cacheuser.json') || await !fs.existsSync('./assets/cacheongkir.json')) {
            await fs.writeFileSync('./assets/cacheuser.json', '{"client1":{"clientid":"value.clientid","backup":false}}');
            await fs.writeFileSync('./assets/cacheongkir.json', '{"user1":{"kurir":"JNE"}}');
        } else {
            let data = await fs.readFileSync('./assets/cacheuser.json', 'utf8');
            const a = await Buffer.from(data);
            let p = await a.toString('utf8');
            cachebackup = await JSON.parse(p);
            let dataongkir = await fs.readFileSync('./assets/cacheongkir.json', 'utf8');
            const b = await Buffer.from(dataongkir);
            let ong = await b.toString('utf8');
            cacheongkir = await JSON.parse(ong);
        }

        let number = message.body.split(' ')[1];
        let content = message.body.split(' ')[2];
        let action = message.body.split(' ')[0];

        let contentai = (a) => { return message.body.split(a)[1] }

        if ((typeof message.body == 'string' && message.body) || message.hasMedia) {
            if (!bad.flag(message.body) || message.body.toLowerCase() == "assalamualaikum") {

                if (action.toLowerCase() === '!backup' || message.hasMedia || (action.toLowerCase() === '!backup' && message.hasMedia)) {
                    console.log('masuk')
                    var callbk = (cachebackup) => {
                        fs.writeFileSync('./assets/cacheuser.json', JSON.stringify(cachebackup))
                    }
                    let cache = {}
                    let file = await message.downloadMedia()
                    await Object.entries(cachebackup).forEach(async (value, index) => {
                        let data = value[1]
                        if ((message.hasMedia && data.clientid == message.from && !data.backup) || (action.toLowerCase() === '!backup' && message.body.length > 8)) {
                            const nama = (message.body.slice(8).length == 0 || undefined) ? `img${Math.floor(Math.random() * 10000)}` : message.body.slice(8);
                            let buffer = await Buffer.from(file.data, "base64");
                            if (file.mimetype.search('image') != '-1') {
                                if (!fs.existsSync(`./assets/foto/${nama}.jpg`) && nama != 'hapus') {
                                    await fs.writeFileSync(`./assets/foto/${nama}.jpg`, buffer)
                                    message.reply(`Foto Berhasil Di Backup\nNama Foto: ${nama}`)
                                    delete cachebackup[`${value[0]}`]
                                    await callbk(cachebackup)
                                    return
                                } else {
                                    message.reply("Nama Foto Sudah Ada, Mohon Ganti Nama Foto")
                                    return
                                }
                            } else if (file.mimetype.search('video') != '-1') {
                                const nama = `vdi${Math.floor(Math.random() * 10000)}`
                                if (!fs.existsSync(`./assets/video/${nama}.mp4`) && nama != 'hapus') {
                                    await fs.writeFileSync(`./assets/video/${nama}.mp4`, buffer)
                                    message.reply(`Video Berhasil Di Backup\nNama Video: ${nama}`)
                                    delete cachebackup[`${value[0]}`]
                                    await callbk(cachebackup)
                                    return
                                } else {
                                    message.reply("Nama Video Sudah Ada, Mohon Ganti Nama Video")
                                    return
                                }

                            } else if (file.mimetype.search('pdf') != '-1') {
                                if (!fs.existsSync(`./assets/dokumen/${file.filename}`) && nama != 'hapus') {
                                    await fs.writeFileSync(`./assets/dokumen/${file.filename}`, buffer)
                                    message.reply(`Dokumen Berhasil Di Backup\nNama Dokumen: ${file.filename}`)
                                    delete cachebackup[`${value[0]}`]
                                    await callbk(cachebackup)
                                    return
                                } else {
                                    message.reply("Nama Dokumen Sudah Ada, Mohon Ganti Nama Dokumen")
                                    return
                                }
                            }
                            else if (file.mimetype.search('zip') != '-1') {
                                if (!fs.existsSync(`./assets/dokumen/${file.filename}`) && nama != 'hapus') {
                                    await fs.writeFileSync(`./assets/dokumen/${file.filename}`, buffer)
                                    message.reply(`Dokumen Berhasil Di Backup\nNama Dokumen: ${file.filename}`)
                                    delete cachebackup[`${value[0]}`]
                                    await callbk(cachebackup)
                                    return
                                } else {
                                    message.reply("Nama Dokumen Sudah Ada, Mohon Ganti Nama Dokumen")
                                    return
                                }
                            }
                            else if (file.mimetype.search('spreadsheetml') != '-1') {
                                if (!fs.existsSync(`./assets/dokumen/${file.filename}`) && nama != 'hapus') {
                                    await fs.writeFileSync(`./assets/dokumen/${file.filename}`, buffer)
                                    message.reply(`Dokumen Berhasil Di Backup\nNama Dokumen: ${file.filename}`)
                                    delete cachebackup[`${value[0]}`]
                                    await callbk(cachebackup)
                                    return
                                } else {
                                    message.reply("Nama Dokumen Sudah Ada, Mohon Ganti Nama Dokumen")
                                    return
                                }
                            }
                            else if (file.mimetype.search('wordprocessingml.document') != '-1') {
                                if (!fs.existsSync(`./assets/dokumen/${file.filename}`) && nama != 'hapus') {
                                    await fs.writeFileSync(`./assets/dokumen/${file.filename}`, buffer)
                                    message.reply(`Dokumen Berhasil Di Backup\nNama Dokumen: ${file.filename}`)
                                    delete cachebackup[`${value[0]}`]
                                    await callbk(cachebackup)
                                    return
                                } else {
                                    message.reply("Nama Dokumen Sudah Ada, Mohon Ganti Nama Dokumen")
                                    return
                                }
                            }
                        }
                        if (action.toLowerCase() == '!backup' && data.clientid != message.from) {
                            let res = { [message.from]: { "clientid": message.from, "backup": false } }
                            Object.assign(cache, res)
                            message.reply('Silahkan Masukan File/Foto/Video');
                        }
                    })
                    await Object.assign(cachebackup, cache)
                    callbk(cachebackup)
                }
                if (action.toLowerCase() === "/cara") {
                    message.reply(`Cara Pengunaan Terdapat 3 Fitur \n
1. Fitur Pengiriman Pesan
Contoh Request : send 0812399202381(Nomer Yang Ingin Dikirimkan Pesan) Hallo.ini.Satrio (. sebagai pengganti spasi)\n
2. Fitur Tanya
Contoh Request : /tanya ibu kota jawa timur(Pertanyaan)\n
3 Fitur Buat Gambar
Pada Fitur buat gambar terdapat 2 opsi yaitu :
1. Default (Akan membuatkan gambar sebanyak 1 kali dari hasil permintaan)
Contoh : /img gambar kucing
2. Set (Akan membuatkan gambar sebanyak jumlah permintaan dari pengguna setelah kata set)
Contoh : /img set 5 Gambar Kucing`);
                } else if (action.toLowerCase() === "!ping") {
                    client.sendMessage(message.from, 'pong');
                } else if (action.toLowerCase() === "!send") {
                    let numfilter = await number.replace(/^[0]{1}/gim, "62")
                    number = await number.includes('@c.us') ? number : `${numfilter}@c.us`;
                    content = await content.replaceAll(".", " ")
                    let from = await message.from.replace("@c.us", "")
                    await message.reply("Berhasil Mengirim Pesan");
                    await client.sendMessage(number, content + `\nDari: ${from}`);
                }
                else if (action.toLowerCase() === "/tanya") {
                    var QE = await contentai("/tanya")
                    const response = await openai.createCompletion({
                        model: "text-davinci-003",
                        prompt: `Q: ${QE} A:`,
                        temperature: 0,
                        max_tokens: 1200,
                        top_p: 1,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0,
                    })
                    message.reply(response.data.choices[0].text);

                }
                else if (action.toLowerCase() === "/img") {
                    let QE = await contentai("/img")
                    let count = 0
                    if (message.body.includes("set")) {
                        count = await contentai("set")
                        QE = await count.match(/([^\s]){1}([0-9]*)([\s]){1}([A-Z]).*/gim)
                    } else {
                        count = 1;
                    }
                    const response = await openai.createImage({
                        prompt: (await Array.isArray(QE)) ? QE[0] : QE.trim(),
                        n: await Number.isInteger(count) ? count : parseInt(count.charAt(1)),
                        size: process.env.SIZE_GAMBAR
                    });
                    if (message.body.includes("set")) {
                        let no = 1
                        for (let i = 0; i < response.data.data.length; i++) {
                            let image_url = response.data.data[i].url;
                            let Media = await MessageMedia.fromUrl(image_url);
                            await client.sendMessage(message.from, Media, { caption: `Berikut Gambar ${no} Hasil Pencarian` })
                            no++;
                        }

                    } else {
                        let image_url = response.data.data[0].url;
                        let Media = await MessageMedia.fromUrl(image_url);
                        await client.sendMessage(message.from, Media, { caption: `Berikut Hasil Gambar Pencarian` })
                    }
                }
                else if (message.body.startsWith('!ganti')) {
                    let chat = await message.getChat();
                    if (chat.isGroup) {
                        let newSubject = message.body.slice(7);
                        chat.setSubject(newSubject);
                    } else {
                        message.reply('Perintah ini hanya bisa digunakan untuk group chat');
                    }
                }
                else if (message.body.startsWith('!anggota')) {

                    let chat = await message.getChat();
                    if (chat.isGroup) {
                        let participant = chat.participants
                        let participantsinfo = `Data Informasi Anggota  (${participant.length} Anggota)\n`;
                        await participant.forEach((item, index) => {
                            let info = `${index + 1}. Nomer Anggota : ${item.id.user}  Role : ${(item.isAdmin) ? 'Admin' : 'Anggota'}\n`;
                            participantsinfo += info
                        });
                        message.reply(participantsinfo)
                    } else {
                        await message.reply('Perintah ini hanya bisa digunakan untuk group chat');
                    }
                }

                else if (message.body.startsWith('!groupinfo')) {
                    let chat = await message.getChat();
                    if (chat.isGroup) {
                        message.reply(`*Group Info*
Nama Group: ${chat.name}
Deskripsi: ${(chat.description == undefined) ? 'Deskripsi Tidak Ada' : chat.description}
Dibuat Pada Tanggal: ${chat.createdAt.toString()}
Dibuat Oleh: ${chat.owner.user}
Jumlah Anggota: ${chat.participants.length}`);

                    } else {
                        message.reply('Perintah ini hanya bisa digunakan untuk group chat');
                    }
                }
                else if (action.toLowerCase() === '!info') {

                    if (message.body.split(" ")[1].toLowerCase() === "covid") {
                        const response = await fetch('https://dekontaminasi.com/api/id/covid19/stats');
                        const data = await response.json();
                        let datcov = data.numbers
                        let info = `Jumlah Kasus Covid di Indonesia Saat Ini\nTerkonfirmasi: ${datcov.infected}\nSembuh: ${datcov.recovered}\nMeninggal: ${datcov.fatal}\nPembaruan Terakhir ${new Date(data.timestamp)}`
                        message.reply(info)
                    } else if (message.body.split(" ")[1].toLowerCase() === "gempa") {
                        let cari = message.body.slice(12)
                        const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
                        const data = await response.json();
                        let datgempa = `*Info Gempa*\n`
                        Object.entries(data.Infogempa).forEach((value, index) => {
                            var data = value[1]
                            var bool = data.Wilayah.toLowerCase().includes(cari.toLowerCase())
                            if ((cari != undefined || cari != "") && bool) {
                                datgempa += `Tanggal: ${data.Tanggal}\nJam: ${data.Jam}\nWilayah: ${data.Wilayah}\nMagnitudo: ${data.Magnitude}\nPotensi : ${data.Potensi}`
                            } else if (cari == undefined || cari == '') {
                                datgempa += `Tanggal: ${data.Tanggal}\nJam: ${data.Jam}\nWilayah: ${data.Wilayah}\nMagnitudo: ${data.Magnitude}\nPotensi : ${data.Potensi}`
                            } else {
                                datgempa += ""
                            }
                        })

                        if (datgempa.length == 13) {
                            message.reply(`Tidak Ada Informasi Mengenai Gempa ${(cari != undefined || cari != '') ? 'Daerah ' + cari : ''} Untuk Saat Ini `)
                        } else if (datgempa.length > 13) {
                            message.reply(datgempa)
                        }
                    }
                    else if (message.body.split(" ")[1].toLowerCase() === "rs") {
                        const response = await fetch('https://dekontaminasi.com/api/id/covid19/hospitals');
                        const data = await response.json();
                        const req = await message.body.slice(9)
                        let info = `*Berikut Hasil Pencarian Informasi Rumah Sakit ${req}*\n`;
                        let no = 1;
                        await data.forEach((value, index) => {
                            if (value.name.search(req.toUpperCase()) != "-1" || value.region.search(req.toUpperCase()) != "-1") {
                                const data = `No.${no} Nama RS : ${value.name}\nAlamat: ${value.address}-${value.province}\nNomer Telpon: ${(value.phone == null) ? '-' : value.phone}\n\n`;
                                info += data;
                                no += 1;
                            }
                        })
                        if (info === `*Berikut Hasil Pencarian Informasi Rumah Sakit ${req}*\n`) {
                            message.reply("Data Tidak Ditemukan")
                        } else {
                            message.reply(info)
                        }
                    } else if (message.body.split(" ")[1].toLowerCase() === "crypto") {
                        const response = await fetch('https://indodax.com/api/summaries');
                        const data = await response.json();

                        let res = `Berikut Informasi Harga Crypto Saat Ini\n`;
                        let nomer = 1;
                        await Object.entries(data.tickers).forEach((value, index) => {
                            let data = value[1]
                            if (message.body.length > 13) {
                                const body = message.body.slice(13)
                                let search = body.charAt(0).toUpperCase() + body.slice(1)
                                if (data.name.search(search) != "-1") {
                                    res += `No.${nomer}  Nama Koin:${data.name}\nExchange:${value[0].replace("_", "-").toUpperCase()}\nHarga Tertinggi:${data.high}\nHarga Terendah:${data.low}\nHarga Saat Ini:${data.last}\nHarga Beli:${data.buy}\nHarga Jual: ${data.sell}\n\n`
                                    nomer += 1
                                }
                            } else if (message.body.length === 12) {
                                res += `No.${index}  Nama Koin :${data.name}\nExchange:${value[0].replace("_", "-").toUpperCase()}\nHarga Tertinggi:${data.high}\nHarga Terendah:${data.low}\nHarga Saat Ini:${data.last}\nHarga Beli:${data.buy}\nHarga Jual: ${data.sell}\n\n`
                            }
                        })
                        if (res === `Berikut Informasi Harga Crypto Saat Ini\n`) {
                            message.reply("Data Yang Dicari Tidak Ditemukan, Silahkan Coba Lagi")
                        } else {
                            message.reply(res)
                        }
                    }

                } else if (action.toLowerCase() === '!cekongkir' || listongkir.includes(action.toLowerCase()) || (action.match(/(^[A-Z]*)([0-9]*)([0-9]$)/gim) != null && action.search('\n') == "-1")) {

                    if (message.body.length === 10) {
                        let sections = [{ title: 'Cek Ongkir Bang 4NR1L', rows: [{ title: "JNE" }, { title: 'JNT' }, { title: 'WAHANA' }, { title: 'TIKI' }, { title: 'SICEPAT' }, { title: 'ANTERAJA' }, { title: 'LION' }] }];
                        let list = new List('Silahkan Tekan Button Dibawah Ini', 'List Ekspedisi', sections, 'List Ekspedisi', 'Created By BANG JAGO 4NR1L');
                        client.sendMessage(message.from, list)
                    }
                    Object.entries(cacheongkir).forEach(async (value, index) => {

                        if (listongkir.includes(action.toLowerCase()) && message.from != value[0]) {
                            let cache = { [message.from]: { kurir: action.toLowerCase() } }
                            await Object.assign(cacheongkir, cache)
                            await fs.writeFileSync('./assets/cacheongkir.json', JSON.stringify(cacheongkir))
                            message.reply('*Silahkan Masukan Nomer Resi Anda*')
                            return
                        } else if (message.from == value[0] && action.match(/(^[A-Z]*)([0-9]*)([0-9]$)/gim) != null) {
                            const response = await fetch('https://pluginongkoskirim.com/front/resi', {
                                method: 'post',
                                body: JSON.stringify({ kurir: value[1].kurir, resi: action }),
                                headers: { 'Content-Type': 'application/json' }
                            });
                            const data = await response.json();
                            if (typeof data.found != undefined) {
                                let pesan = `*Information*\n`
                                var detail = data.data.detail
                                pesan += `No Resi : ${action}\nService : ${detail.service}\nPosisi Saat Ini : ${detail.current_position}\n Kota Pengiriman : ${detail.origin}\nKota Penerima : ${detail.destination}\n Status : ${detail.status}\n Detail User : \n \t Nama Pengirim : ${detail.shipper.name}\n \t Nama Penerima : ${detail.consignee.name}\n Histori Pengiriman :\n`
                                if (detail.history) {
                                    await detail.history.forEach((values, indexs) => {
                                        pesan += `${indexs + 1}. Posisi : ${values.position} - ${values.time}\n ${values.desc}\n\n`
                                    })
                                    await delete cacheongkir[`${message.from}`]
                                    await fs.writeFileSync('./assets/cacheongkir.json', JSON.stringify(cacheongkir))
                                    await message.reply(pesan)
                                    return
                                }
                            } else if (typeof data.error != undefined && data.found == undefined) {
                                await delete cacheongkir[`${message.from}`]
                                await fs.writeFileSync('./assets/cacheongkir.json', JSON.stringify(cacheongkir))
                                console.log('gagal')
                                message.reply(data.message)
                                return
                            }
                        }
                    })

                } else if (action.toLowerCase() === '!foto') {
                    if (message.body.split(' ')[1] != 'hapus') {
                        let namafoto = message.body.slice(6)
                        if (fs.existsSync(`./assets/foto/${namafoto}.jpg`)) {
                            let image = await MessageMedia.fromFilePath(`./assets/foto/${namafoto}.jpg`)
                            client.sendMessage(message.from, image)
                        } else {
                            message.reply(`Tidak Ada Foto Dengan Nama ${namafoto}`)
                        }
                    } else if (message.body.split(' ')[1] == 'hapus') {
                        let namafoto = message.body.slice(12)
                        if (fs.existsSync(`./assets/foto/${namafoto}.jpg`)) {
                            fs.unlinkSync(`./assets/foto/${namafoto}.jpg`)
                            message.reply(`Foto Dengan Nama ${namafoto} Berhasil Dihapus`)
                        } else {
                            message.reply(`Tidak Ada Foto Dengan Nama ${namafoto}`)
                        }
                    }
                } else if (action.toLowerCase() === '!vidio') {
                    if (message.body.split(' ')[1] != 'hapus') {
                        let namafoto = message.body.slice(7)
                        console.log(namafoto)
                        if (fs.existsSync(`./assets/video/${namafoto}.mp4`)) {
                            let video = await MessageMedia.fromFilePath(`./assets/video/${namafoto}.mp4`)
                            client.sendMessage(message.from, video)
                        } else {
                            message.reply(`Tidak Ada Video Dengan Nama ${namafoto}`)
                        }
                    } else if (message.body.split(' ')[1] == 'hapus') {
                        let namafoto = message.body.slice(12)
                        if (fs.existsSync(`./assets/video/${namafoto}.mp4`)) {
                            fs.unlinkSync(`./assets/video/${namafoto}.mp4`)
                            message.reply(`Video Dengan Nama ${namafoto} Berhasil Dihapus`)
                        } else {
                            message.reply(`Tidak Ada Video Dengan Nama ${namafoto}`)
                        }
                    }
                }
                else if (action.toLowerCase() === '!dokumen') {
                    if (message.body.split(' ')[1] != 'hapus') {
                        let namafoto = message.body.slice(9)
                        if (fs.existsSync(`./assets/dokumen/${namafoto}`)) {
                            let video = await MessageMedia.fromFilePath(`./assets/dokumen/${namafoto}`)
                            client.sendMessage(message.from, video)
                        } else {
                            message.reply(`Tidak Ada Dokumen Dengan Nama ${namafoto}`)
                        }
                    } else if (message.body.split(' ')[1] == 'hapus') {
                        let namafoto = message.body.slice(15)
                        if (fs.existsSync(`./assets/dokumen/${namafoto}`)) {
                            fs.unlinkSync(`./assets/dokumen/${namafoto}`)
                            message.reply(`Dokumen Dengan Nama ${namafoto} Berhasil Dihapus`)
                        } else {
                            message.reply(`Tidak Ada Dokumen Dengan Nama ${namafoto}`)
                        }
                    }
                }
            } else {
                message.delete({ everyone: true })
                message.reply("Kata Tidak Diperbolehkan Dikarenakan Mengandung Kata Kasar!!!")
            }
        }
    });
}


Tes();

