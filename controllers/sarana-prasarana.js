import SaranaPrasarana from "../models/sarana-prasarana.js";
import response from "../utils/response.js";
import { notFoundResponse, successResponse } from "../utils/handleResponse.js"
import encrypt from "../utils/encrypt.js";
import capitalize from "../utils/capitalize.js";
import Joi from "joi";
import { storage } from "../config.js";

export async function getSaranaPrasarana(req, res) {
  try {
    //* Inisialisasi Schema Validasi params route
    const schema = Joi.object({
      namaSaranaPrasarana: Joi.string()
        .pattern(/^[a-z]+$/)
        .min(3)
        .max(200)
        .required(),
    });

    //* Validasi params route
    const result = schema.validate({
      namaSaranaPrasarana: req.params.namaSaranaPrasarana.toLowerCase(),
    });

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (result.error) {
      return res.status(400).json(
        response(
          400,
          "User Error",
          null,
          result.error.details.map((error) => error.message)
        )
      );
    }

    const saranaPrasarana = await SaranaPrasarana.findOne({
      titleImage: result.value.namaSaranaPrasarana,
    });

    if (!saranaPrasarana) {
      return notFoundResponse(res)
    }

    const dataSaranaPrasarana = successResponse(res, saranaPrasarana);

    const encryptedResponse = encrypt(dataSaranaPrasarana, "123");

    return res.status(200).json(encryptedResponse);
  } catch (error) {
    return res.status(500).json(response(500, "Server Error", null, error));
  }
}

export async function postSaranaPrasarana(req, res) {
  try {
    //* Inisialisasi Schema Validasi data input user
    const schema = Joi.object({
      titleImage: Joi.string().min(5).max(200).required(),
    });

    //* Data input user, setiap karakternya dijadikan lowercase
    let lowercaseData;

    if (typeof req.body.titleImage === "string") {
      lowercaseData = req.body.titleImage;
    }

    //* Validasi data input user
    const result = schema.validate({ titleImage: lowercaseData });

    //* Jika tidak memenuhi syarat validasi, maka memberikan "response error"
    if (result.error) {
      return res.status(400).json(
        response(
          400,
          "User Error",
          null,
          result.error.details.map((error) => error.message)
        )
      );
    }

    //* Mengambil data dalam Database berdasarkan input user
    const existingSaranaPrasarana = await SaranaPrasarana.findOne({
      titleImage: lowercaseData,
    });

    //* Jika data yang diinputkan user tidak tersedia, maka tambah data "titleImage dan foto"
    if (existingSaranaPrasarana === null) {
      const image = req.file;

      if (!image) {
        return res
          .status(400)
          .json(
            response(400, "User Error", { message: "Tidak ada gambar" }, null)
          );
      }

      const bucket = storage.bucket();

      const dest = capitalize(req.params.namaSaranaPrasarana);
      const fileName = `${Date.now()}_${image.originalname}`;
      const file = bucket.file(`${dest}/${fileName}`);

      const fileStream = file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      });

      fileStream.on("error", () => {
        return res
          .status(400)
          .json(
            response(
              400,
              "User Error",
              { message: "Error ketika menupload gambar" },
              null
            )
          );
      });

      fileStream.on("finish", async () => {
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: "03-01-2500",
        });

        const newDataImgUrl = {
          fileName,
          url,
        };

        const saranaPrasarana = new SaranaPrasarana({
          titleImage: lowercaseData,
          urlImage: [newDataImgUrl],
        });

        await saranaPrasarana.save();

        return res
          .status(200)
          .json(response(200, "OK", { message: "Sukses" }, null));
      });
      fileStream.end(image.buffer);

      //* Selain Jika data yang diinputkan user sudah ada, maka tambah data "foto" saja
    } else {
      const image = req.file;

      if (!image) {
        return res
          .status(400)
          .json(
            response(400, "User Error", { message: "Tidak ada gambar" }, null)
          );
      }

      const bucket = storage.bucket();

      const dest = capitalize(req.params.namaSaranaPrasarana);
      const fileName = `${Date.now()}_${image.originalname}`;
      const file = bucket.file(`${dest}/${fileName}`);

      const fileStream = file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      });

      fileStream.on("error", () => {
        return res
          .status(400)
          .json(
            response(
              400,
              "User Error",
              { message: "Error ketika menupload gambar" },
              null
            )
          );
      });

      fileStream.on("finish", async () => {
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: "03-01-2500",
        });

        const newDataImgUrl = {
          fileName,
          url,
        };

        existingSaranaPrasarana.urlImage.push(newDataImgUrl);

        await existingSaranaPrasarana.save();

        return res
          .status(200)
          .json(response(200, "OK", { message: "Sukses" }, null));
      });
      fileStream.end(image.buffer);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(response(500, "Server Error", null, error));
  }
}

export async function deleteSaranaPrasarana(req, res) {
  try {
    //* Inisialisasi Schema Validasi params route
    const schemaSaranaPrasarana = Joi.object({
      idImageUrl: Joi.string()
        .pattern(/^[a-z0-9]+$/)
        .min(3)
        .max(200)
        .required(),
      namaSaranaPrasarana: Joi.string().min(5).max(200).required(),
    });

    //* Data input user, setiap karakternya dijadikan lowercase
    let lowercaseData;

    if (typeof req.params.namaSaranaPrasarana === "string") {
      lowercaseData = req.params.namaSaranaPrasarana.toLowerCase();
    }

    //* Validasi params route
    const result = schemaSaranaPrasarana.validate({
      idImageUrl: req.params.idImageUrl,
      namaSaranaPrasarana: lowercaseData,
    });

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (result.error) {
      return res.status(400).json(
        response(
          400,
          "User Error",
          null,
          result.error.details.map((error) => error.message)
        )
      );
    }

    const saranaPrasarana = await SaranaPrasarana.findOne({
      titleImage: lowercaseData,
    });

    if (!saranaPrasarana) {
      return res.status(404).json(
        response(404, "Data Not Found", null, {
          message: "Data tidak ditemukan",
        })
      );
    }

    //* Temukan url gambar pada database
    const findUrlImageObject = saranaPrasarana.urlImage.find(
      (imageObject) => imageObject._id === result.value.idImageUrl
    );

    const newSaranaPrasarana = saranaPrasarana.urlImage.filter(
      (url) => url._id !== result.value.idImageUrl
    );

    //* Jika ditemukan, hapus url gambarnya
    if (findUrlImageObject) {
      const fileName = findUrlImageObject.fileName;
      const file = storage
        .bucket()
        .file(`${capitalize(lowercaseData)}/${fileName}`);
      await file.delete();
    }

    saranaPrasarana.urlImage = newSaranaPrasarana;
    await saranaPrasarana.save();

    return res
      .status(200)
      .json(response(200, "OK", { message: "Sukses" }, null));
  } catch (error) {
    console.log(error);
    return res.status(500).json(response(500, "Server Error", null, error));
  }
}
