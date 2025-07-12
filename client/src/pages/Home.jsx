import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import DoctorList from '../components/DoctorList';
import { Row, Input, Select } from 'antd';

const { Option } = Select;

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name'); // 'name' or 'specialization'

  const getDoctorData = async () => {
    try {
      const result = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token'),
        }
      });
      if (result.data.success) {
        setDoctors(result.data.data);
        // console.log(result.data.data);
        setFilteredDoctors(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = doctors.filter((doctor) => {
      if (searchType === 'name') {
        return (
          (doctor.firstname?.toLowerCase().includes(term) || '') ||
          (doctor.lastname?.toLowerCase().includes(term) || '')
        );
      } else if (searchType === 'specialization') {
        return doctor.specialization?.toLowerCase().includes(term) || '';
      }
      return true;
    });
    setFilteredDoctors(filtered);
  }, [searchTerm, searchType, doctors]);
  

  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>DOCTOR AVAILABLE</h1>

      <div style={{ maxWidth: 600, margin: "20px auto", display: 'flex', gap: '10px' }}>
        <Select
          value={searchType}
          onChange={(value) => setSearchType(value)}
          style={{ width: 180 }}
        >
          <Option value="name">Search by Name</Option>
          <Option value="specialization">Search by Specialization</Option>
        </Select>
        <Input
          placeholder={`Enter ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{ flex: 1 }}
        />
      </div>

      <Row gutter={[16, 16]}>
        {filteredDoctors.map((doctor, index) => (
          <DoctorList key={index} doctor={doctor} />
        ))}
      </Row>
    </Layout>
  );
};

export default Home;
