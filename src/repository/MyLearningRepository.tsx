import { Modal } from "antd";
import axios, { AxiosResponse } from "axios";

let auth: any = "";

export const postLogin = (obj: any) => {
    return axios
        .post("http://localhost:12006/practice/lgoin", obj, {
            proxy: {
                host: "localhost",
                port: 12006
            },
        })
        .then((res: AxiosResponse<any>) => {
            console.log(res);
            auth = res.data.token;
            Modal.success({ title: "Login Berhasil" });
            window.location.href = "#";
        })
        .catch((error: any) => {
            console.log(error.response.data.error);
            Modal.error({ title: "Login Gagal" });
        })
}

export const getMyLearningPagination = (params: any) => {
    return axios.get("http://localhost:12006/practice/get", {
        headers: {
            // Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImV4cCI6MTYzNjI5NzIwMX0.yw9rypsBM98SgE9KyfnovPFUOEX9nUuqOvyPpoKxhHc"}`,
            Authorization: `Bearer ${auth}`,
        },
        proxy: {
            host: "localhost",
            port: 12006,
        },
        params: { page: params.page, size: params.size, onProgress: params.onProgress, applied: params.applied, completed: params.completed, bookmark: params.bookmark, seachCriteria: params.searchC, all: params.all },
    });
}