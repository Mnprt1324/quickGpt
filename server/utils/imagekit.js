import ImageKit from 'imagekit';

const imagekit = new ImageKit({
    publicKey: process.env.IMG_KIT_publicKey,
    privateKey: process.env.IMG_KIT_privateKey,
    urlEndpoint: process.env.IMG_KIT_urlEndpoint
})
export default imagekit;
