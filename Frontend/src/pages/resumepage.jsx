import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/resumepage.css';
import { getResumeRoute } from '../utils/frontendRoutes';

function Resume() {
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [pName, setPName] = useState(null);
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    image: '',
  });
  const [address, setAddress] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [education, setEducation] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [workExperience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [data4, setData4] = useState({});
  const [data5, setData5] = useState({});
  const [data6, setData6] = useState({});
  const [data7, setData7] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const rspns = await axios.get(getResumeRoute);
      const response = rspns.data;
      setPName(response[0]);
      setData1(response[1]);
      setData2(response[2]);
      setData3(response[3]);
      setData4(response[4]);
      setData5(response[5]);
      setData6(response[6]);
      setData7(response[7]);
      setDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPersonalDetails({
      ...personalDetails,
      name: data1.name,
      email: data1.email,
      phoneNumber: data1.phoneNumber,
      image: data1.image,
    });
  }, [data1]);

  useEffect(() => {
    if (data2) {
      setAddress({
        ...address,
        streetAddress: data2.streetAddress,
        city: data2.city,
        state: data2.state,
        zipCode: data2.zipCode,
        country: data2.country,
      });
    }
  }, [data2]);

  useEffect(() => {
    if (Array.isArray(data3)) {
      setEducation(data3);
    }
  }, [data3]);

  useEffect(() => {
    if (Array.isArray(data4)) {
      setAchievements(data4);
    }
  }, [data4]);

  useEffect(() => {
    if (Array.isArray(data5)) {
      setExperience(data5);
    }
  }, [data5]);

  useEffect(() => {
    if (Array.isArray(data6)) {
      setProjects(data6);
    }
  }, [data6]);

  useEffect(() => {
    if (Array.isArray(data7)) {
      setSkills(data7);
    }
  }, [data7]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="resume">
      <div className="resume-header">
        <a onClick={handleDownload}>
          <h1>Resume</h1>
        </a>
      </div>
      <hr />

      <div className="resume-content">
        {personalDetails && (
          <div className="section">
            <h2>Personal Details</h2>
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{personalDetails.name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{personalDetails.email}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{personalDetails.phoneNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {address && (
          <div className="section">
            <h2>Address</h2>
            <table>
              <tbody>
                <tr>
                  <td>Street Address:</td>
                  <td>{address.streetAddress}</td>
                </tr>
                <tr>
                  <td>City:</td>
                  <td>{address.city}</td>
                </tr>
                <tr>
                  <td>State:</td>
                  <td>{address.state}</td>
                </tr>
                <tr>
                  <td>Country:</td>
                  <td>{address.country}</td>
                </tr>
                <tr>
                  <td>Zip Code:</td>
                  <td>{address.zipCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {education.length > 0 && (
          <div className="section">
            <h2>Education</h2>
            <table>
              <tbody>
                {education.map((edu, index) => (
                  <tr key={index}>
                    <td>{edu.name}</td>
                    <td>{edu.institute}</td>
                    <td>{edu.degree}</td>
                    <td>{edu.percentage}</td>
                    <td>{edu.passingYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {achievements.length > 0 && (
          <div className="section">
            <h2>Achievements</h2>
            <table>
              <tbody>
                {achievements.map((achievement, index) => (
                  <tr key={index}>
                    <td>{achievement.title}</td>
                    <td>{achievement.dateAchieved}</td>
                    <td>{achievement.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {workExperience.length > 0 && (
          <div className="section">
            <h2>Work Experience</h2>
            <table>
              <tbody>
                {workExperience.map((experience, index) => (
                  <tr key={index}>
                    <td>{experience.company}</td>
                    <td>{experience.timeperiod}</td>
                    <td>{experience.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {projects.length > 0 && (
          <div className="section">
            <h2>Projects</h2>
            <table>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>{project.project}</td>
                    <td>{project.duration}</td>
                    <td>{project.completionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {skills.length > 0 && (
          <div className="section">
            <h2>Skills</h2>
            <table>
              <tbody>
                {skills.map((item, index) => (
                  <tr key={index}>
                    <td>&#8226; {item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;
