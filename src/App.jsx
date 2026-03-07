import { useState, useRef } from 'react'
import { Download, Upload, User, MapPin, Phone, Calendar, Hash, ShieldCheck } from 'lucide-react'
import { toPng } from 'html-to-image'
import './index.css'

import ambedkarLogo from './assets/ambedkar_logo.png'
import panchayatLogo from './assets/panchayat_logo.png'

function App() {
  const [formData, setFormData] = useState({
    firstName: 'Kanti',
    middleName: 'Velji',
    lastName: 'Boricha',
    dob: '21.10.1959',
    gender: 'M',
    address: 'BIT Chawl No 01/63, K K Marg Satrasta, Mumbai - 400011.',
    mobile: '8097649772',
    period: '5 Year',
    validUpto: '31st Dec. 2028',
    membershipNo: 'STR-12/V0001',
    dateOfIssue: '1st Feb. 2024',
    photo: null
  })

  const cardRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadCard = () => {
    if (cardRef.current === null) return

    toPng(cardRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `ID_Card_${formData.firstName}_${formData.lastName}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err)
      })
  }

  return (
    <>
      <div className="sidebar">
        <h2>ID Card Creator</h2>

        <div className="form-group">
          <label>Member Photo</label>
          <div className="upload-section" onClick={() => document.getElementById('photo-input').click()}>
            <Upload size={24} style={{ marginBottom: '8px', color: 'var(--primary-pink)' }} />
            <p style={{ fontSize: '0.8rem', color: '#666' }}>
              {formData.photo ? 'Change Photo' : 'Upload Square Photo'}
            </p>
            <input
              id="photo-input"
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>

        <div className="name-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
            />
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              placeholder="Middle name"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Surname</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Surname"
          />
        </div>

        <div className="name-row">
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              placeholder="DD.MM.YYYY"
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="3"
            placeholder="Enter full address"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Mobile number"
          />
        </div>

        <div className="name-row">
          <div className="form-group">
            <label>Period</label>
            <select name="period" value={formData.period} onChange={handleInputChange}>
              <option value="Life time">Life time</option>
              <option value="5 Year">5 Year</option>
              <option value="1 Year">1 Year</option>
            </select>
          </div>
          <div className="form-group">
            <label>Membership No.</label>
            <input
              type="text"
              name="membershipNo"
              value={formData.membershipNo}
              onChange={handleInputChange}
              placeholder="STR-00/XXXXX"
            />
          </div>
        </div>

        <div className="name-row">
          <div className="form-group">
            <label>Valid Upto</label>
            <input
              type="text"
              name="validUpto"
              value={formData.validUpto}
              onChange={handleInputChange}
              placeholder="e.g. 31st Dec. 2028"
            />
          </div>
          <div className="form-group">
            <label>Date of Issue</label>
            <input
              type="text"
              name="dateOfIssue"
              value={formData.dateOfIssue}
              onChange={handleInputChange}
              placeholder="e.g. 1st Feb. 2024"
            />
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="id-card-container">
          <div className="id-card" ref={cardRef}>
            <div className="card-top-stripes">
              <div className="stripe-blue"></div>
              <div className="stripe-green">|| Jai Meghwal-Vankar ||</div>
              <div className="stripe-orange"></div>
            </div>

            <div className="card-header">
              <div className="header-logo">
                <img src={panchayatLogo} alt="Logo" className="header-logo" />
              </div>

              <div className="header-text">
                <h1>MUMBAI MEGHWAL PANCHAYAT</h1>
                <h2>(CENTRAL WORKING COMMITTEE)</h2>
                <p>[Regd. No. Ms. 491/GB. BSD * PTR No. F-13507 (Mumbai)]</p>
              </div>

              <div className="header-logo">
                <img src={ambedkarLogo} alt="Ambedkar" className="header-logo" />
              </div>
            </div>

            <div className="office-bar">
              Office : C/o. B-4, Sant Veer Meghmaya Marg, Tulsiwadi, Mahalaxmi, Mumbai - 400 034.
            </div>

            <div className="card-body">
              <div className="photo-container">
                {formData.photo ? (
                  <img src={formData.photo} alt="Member" />
                ) : (
                  <User size={80} color="#ccc" />
                )}
              </div>

              <div className="details-container">
                <div className="member-name">
                  {`${formData.firstName} ${formData.middleName} ${formData.lastName}`}
                </div>

                <div className="info-item">
                  <span className="info-label">DOB : </span>
                  {formData.dob}-{formData.gender}
                </div>

                <div className="info-item" style={{ maxWidth: '450px' }}>
                  <span className="info-label">Address : </span>
                  {formData.address}
                </div>

                <div className="info-item">
                  <span className="info-label">Mob.</span>
                  {formData.mobile}
                </div>

                <div className="membership-no">
                  <span className="info-label">Membership No.: </span>
                  <span className="value">{formData.membershipNo}</span>
                </div>

                <div className="valid-upto-box">
                  Valid Up To : {formData.validUpto}
                </div>

                <div className="issue-date">
                  Date of Issue : {formData.dateOfIssue}
                </div>
              </div>
            </div>

            <div className="card-footer">
              <div style={{ marginBottom: '10px' }}>
                <svg width="150" height="50" viewBox="0 0 150 50">
                  <path d="M10 40 Q 30 10, 50 40 T 90 40 T 140 20" fill="none" stroke="#001C6B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="signature-name">(R.P. Dharia)</div>
              <div className="signature-title">President</div>
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="btn btn-secondary" onClick={() => setFormData({
            firstName: '', middleName: '', lastName: '', dob: '', gender: 'M',
            address: '', mobile: '', period: '1 Year', validUpto: '',
            membershipNo: '', dateOfIssue: '', photo: null
          })}>
            Clear Form
          </button>
          <button className="btn btn-primary" onClick={downloadCard}>
            <Download size={20} />
            Download ID Card
          </button>
        </div>
      </div>
    </>
  )
}

export default App
