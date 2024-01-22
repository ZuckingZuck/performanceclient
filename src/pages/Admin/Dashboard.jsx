import React, { useEffect, useState } from 'react';
import StatsCard from '../../components/Admin/StatsCard';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { useSelector } from 'react-redux';
import { Table, Space, Modal } from 'antd';
import axios from 'axios';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/userSlice';


const Welcome = () => {
  useDocumentTitle("IPSS - Admin");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.user.user);
  const [trainee, setTrainee] = useState();
  const [teamApplication, setTeamApplication] = useState();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/counts`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if(response.status === 401 || response.status === 403){
        console.error('Notları getirme hatası:', response.statusText);
        dispatch(userLogout());
        localStorage.removeItem("user");
        navigate("/login");
      }

      if (response.ok) {
        const json = await response.json();
        setTrainee(json.traineeCount);
        setTeamApplication(json.teamAppCount);
      }
    };

    const getNotes = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/getnotes`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if(response.status === 401 || response.status === 403){
        console.error('Notları getirme hatası:', response.statusText);
        dispatch(userLogout());
        localStorage.removeItem("user");
        navigate("/login");
      }

      if (response.status === 200) {
        setNotes(response.data);
      } else {
        console.log("error");
      }
    };

    getInfo();
    getNotes();
  }, [user.token, dispatch, navigate]);

  const columns = [
    {
      title: 'Gönderen',
      dataIndex: 'sender',
      key: 'sender',
    },
    {
      title: 'Alıcı',
      dataIndex: 'receiver',
      key: 'receiver',
    },
    {
      title: 'Mesaj',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <p onClick={() => handleView(record)} style={{ color: '#1890ff' }}>
            Görüntüle
          </p>
        </Space>
      ),
    },
  ];

  const handleView = (record) => {
    setSelectedNote(record);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex">
      <AdminNavbar />
      <div className="container mx-auto">
        <h1 className="text-xl font-bold mt-7">
          Hoşgeldin {user?.user?.username}, {user?.user?.role} yetkileriyle panele erişiyorsun.
        </h1>
        <div className="flex flex-col lg:flex-row gap-3 text-center justify-self-center justify-around mt-10">
          <StatsCard
            img="https://cdn-icons-png.flaticon.com/512/4922/4922073.png"
            title={'Toplam Blog Sayısı'}
            number={posts?.length}
          />
          <StatsCard
            img="https://cdn-icons-png.flaticon.com/512/4185/4185176.png"
            title={'Ekip Başvuru Sayısı'}
            number={teamApplication}
          />
          <StatsCard
            img="https://cdn-icons-png.flaticon.com/512/2201/2201570.png"
            title={'Kursiyer Başvuru Sayısı'}
            number={trainee}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Notlar</h2>
          <Table
            columns={columns}
            dataSource={notes}
            rowKey="_id"
            pagination={false}
            className="rounded-md overflow-hidden shadow-md text-black"
          />

          <Modal
            title="Not Detayları"
            visible={modalVisible}
            onCancel={handleModalCancel}
            footer={null}
          >
            {selectedNote && (
              <div>
                <p>
                  <strong>Gönderen:</strong> {selectedNote.sender}
                </p>
                <p>
                  <strong>Alıcı:</strong> {selectedNote.receiver}
                </p>
                <p>
                  <strong>Mesaj:</strong> {selectedNote.message}
                </p>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
