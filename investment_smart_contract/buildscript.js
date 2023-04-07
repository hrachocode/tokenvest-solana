const metadata = require("./target/ink/investment_smart_contract.json");
const CMS_API = "http://localhost:1337";
const fs = require("fs");
const fileName = "investment_smart_contract";

const bufferToHex = (buffer) => {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
};

const handleRequest = async (url, method, data) => {
    const dataRes = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const res = await dataRes.json();
    return res;
};

const getContracts = async () => {
    const contracts = await handleRequest(`${CMS_API}/api/contracts?populate=*`, "GET");
    return contracts;
}



const pushToContracts = async () => {
    const contract = await handleRequest(`${CMS_API}/api/contracts`, "POST", {
        data: {
            metadata
        }
    });
    return contract.data.id;
};



const pushFile = async (id, file) => {
    if (id) {
        if (file) {
            const formData = new FormData();
            const fileBlob = new Blob(file, { type: 'application/wasm' });
            formData.append("ref", "api::contract.contract");
            formData.append("refId", id);
            formData.append("field", "wasmFile");
            formData.append("files", fileBlob, `${fileName}.wasm`);
            const postRes = await fetch(`${CMS_API}/api/upload`, {
                method: "POST",
                body: formData
            });
            return postRes.ok;
        }
    };
};

const readAndUpload = async (id) => {
    await fs.readFile('./target/ink/investment_smart_contract.wasm', async (err, data) => {
        if (data) {
            const fileUploaded = await pushFile(id, data);
            if (fileUploaded) {
                console.log("Contract uploaded successfully!!");
            } else {
                console.log("Something went wrong!!");
            }
        }
    });
};

const main = async () => {
    const id = await pushToContracts();
    await readAndUpload(id);
};

main();