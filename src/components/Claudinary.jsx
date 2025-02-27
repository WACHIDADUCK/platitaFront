import { useState } from "react";
import axios from "axios";

export default function Claudinary() {

    const [Url_Imagen, setUrl_Imagen] = useState("");

    const changedUploadImage = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'subirImagen');
        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/daeapj5dv/image/upload', formData);
            const url = res.data.secure_url;
            setUrl_Imagen(url);
            console.log(url);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h1>Seleccionar imagen</h1>
            <div>
                <input type="file" accept='image/*' onChange={changedUploadImage} />
                {Url_Imagen && (
                    <div>
                        <img src={Url_Imagen} alt="imagen" />
                    </div>
                )}
            </div>
        </div>
    )
}