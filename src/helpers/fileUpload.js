export const fileUpload= async( file ) =>{
    if(!file) throw new Error('No hay Archivo Para Subir ')

    const url = `https://api.cloudinary.com/v1_1/duiyyo9hf/upload`

    const formDaata = new FormData()
    formDaata.append('upload_preset','react-journald')
    formDaata.append('file', file )

    try {

        const resp = await fetch( url,{
            method: 'POST',
            body: formDaata
        } );

       
        if(!resp.ok) throw new Error('oooh!!, Algo salio Mal ')

        const cloudResp = await resp.json();
      

        return cloudResp.secure_url;

    } catch (error) {
        throw new Error('Error: ', error.message )
    }

}
