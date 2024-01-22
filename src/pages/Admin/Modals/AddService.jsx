import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../../../redux/serviceSlice";
import { useNavigate } from "react-router-dom";

const AddService = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contentImage, setContentImage] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState();
  const user = useSelector((state) => state.user.user);
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = { ServiceTitle: values.title,ContentImageUrl: contentImage, ImageUrl: imgUrl, ServiceDescription: description };
        const postServices = async () => {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/admin/service`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({addService: data}),
            }
          );
          if(response.status === 403 || response.status === 401){
            message.error("Yetkiniz yok!")
            navigate("/admin");
          }
          if(response.ok){
            const json = await response.json();
            dispatch(addService(json));
            form.resetFields();
            setImgUrl("");
          }

        };
        postServices();
        setOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const customContentRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("name", file);

    const apiUrl = `${process.env.REACT_APP_API_URL}/api/admin/upload`;

    fetch(apiUrl, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        message.success("Dosya yüklendi.");
        onSuccess(data);
        setContentImage(data.imgUrl);
      })
      .catch((error) => {
        onError();
        message.error("Dosya yüklenirken bir hata oluştu!");
        console.error("File upload error:", error);
      });
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("name", file);

    const apiUrl = `${process.env.REACT_APP_API_URL}/api/admin/upload`;

    fetch(apiUrl, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        message.success("Dosya yüklendi.");
        onSuccess(data);
        setImgUrl(data.imgUrl);
      })
      .catch((error) => {
        onError();
        message.error("Dosya yüklenirken bir hata oluştu!");
        console.error("File upload error:", error);
      });
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Lütfen bir resim dosyası yükleyin!");
    }
    return isImage;
  };
  return (
    <Modal
      width={700}
      title="Hizmet Ekle"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Başlık"
          rules={[{ required: true, message: "Başlık alanı zorunludur!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="coverImageUrl"
          label="Kapak Resim URL"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: "Lütfen bir görsel yükleyin!" }]}
        >
          <Upload
            customRequest={customRequest}
            beforeUpload={beforeUpload}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Görsel Yükle</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="contentImageUrl"
          label="İçerik Resim URL"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: "Lütfen bir görsel yükleyin!" }]}
        >
          <Upload
            customRequest={customContentRequest}
            beforeUpload={beforeUpload}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Görsel Yükle</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="content"
          label="İçerik"
          rules={[{ required: true, message: "İçerik alanı zorunludur!" }]}
        >
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
              const content = editor.getData();
              setDescription(content);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddService;
