import userData from "../user/userData";

export default async function shareTitle({ title }) {
    try {
        const api = await fetch(import.meta.env.VITE_API_URL + `/api/vshelf/title`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title_id: title.id,
                owner_id: userData?.public_id,
                titulo: title.titulo,
                nota: title.nota,
                stream: title.stream,
                classificacao: title.classificacao,
                genero: title.genero,
                status: title.status,
                tipo: title.tipo,
                estrelas: title.estrelas,
                image: title.image,
                background: title.background,
                sinopse: title.sinopse
            }),
        });

        if (api.status != 404) {
            const res = await api.json();

            const link = `https://www.vshelf.app/titulo?id=${res.id}`
            window.electron.ipcRenderer.send('copy-to-clipboard', link);
            window.electron.ipcRenderer.send('create-notify', {
                title: 'Link criado com sucesso!',
                body: 'O link foi copiado para o sua área de transferência',
            });

        } else {
            window.open('https://www.vshelf.app/error_404', '_blank')
        };

    } catch (err) {
        throw new Error(err);
    };
};