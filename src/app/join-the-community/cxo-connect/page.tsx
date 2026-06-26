'use client';

import React, { useState } from 'react';

const eligibleTitles = [
  'CIOs – Chief Information Officers',
  'CTOs – Chief Technology Officers',
  'CDOs – Chief Digital Officers',
  'CDOs – Chief Data Officers',
  'CISOs – Chief Information Security Officers',
  'ITDMs – Senior Most Information Technology Decision Makers',
];

export default function CxoConnectPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    designation: '',
    officialEmail: '',
    telephone: '',
    mobile: '',
    linkedin: '',
    companyName: '',
    companyAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    companyCategory: '',
    businessVertical: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // console.log(formData);

  return (
    <main className="cxo-join-page">
      <section className="cxo-join-hero">
        <div className="cxo-join-container">
          <p className="cxo-join-breadcrumb">Join Us</p>
          <h1>CXO Connect</h1>
        </div>
      </section>

      <section className="cxo-join-section">
        <div className="cxo-join-container cxo-join-grid">
          <div className="cxo-join-content">
            <span className="cxo-join-label">CXO Hub Network</span>
            <h2>Dear CXO,</h2>

            <p>
              We invite <strong>YOU</strong> to join our network. I look forward to forging a
              mutually beneficial and collaborative partnership.
            </p>

            <p>
              Thank you for entrusting us with the opportunity to contribute to your success.
              Together, we will shape a future where technology empowers and connects us all.
            </p>

            <div className="cxo-join-signature">
              <p>Regards,</p>
              <h3>Anoop Mathur</h3>
            </div>

            <div className="cxo-eligible-box">
              <h3>CXO Titles Eligible to Join the Network:</h3>
              <ul>
                {eligibleTitles.map((title) => (
                  <li key={title}>{title}</li>
                ))}
              </ul>
            </div>
          </div>

          <form className="cxo-join-form">
            <h2>Join the Network</h2>

            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  handleChange('firstName', e.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />

              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  handleChange('lastName', e.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />
            </div>

            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value.replace(/[^A-Za-z\s.]/g, ''))}
              />

              <input
                type="text"
                placeholder="Current Designation"
                value={formData.designation}
                onChange={(e) => handleChange('designation', e.target.value)}
              />
            </div>

            <div className="cxo-form-row">
              <input
                type="email"
                placeholder="Email (Official)"
                value={formData.officialEmail}
                onChange={(e) => handleChange('officialEmail', e.target.value)}
              />

              <input
                type="tel"
                placeholder="Telephone No"
                maxLength={10}
                value={formData.telephone}
                onChange={(e) => handleChange('telephone', e.target.value.replace(/[^0-9]/g, ''))}
              />
            </div>

            <div className="cxo-form-row">
              <input
                type="tel"
                placeholder="CIO Mobile Phone"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => handleChange('mobile', e.target.value.replace(/[^0-9]/g, ''))}
              />

              <input
                type="url"
                placeholder="LinkedIn Link"
                value={formData.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
              />
            </div>

            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />

              <textarea
                className="company-address-field"
                placeholder="Company Address"
                rows={1}
                value={formData.companyAddress}
                onChange={(e) => handleChange('companyAddress', e.target.value)}
              />
            </div>

            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value.replace(/[^A-Za-z\s]/g, ''))}
              />

              <input
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value.replace(/[^A-Za-z\s]/g, ''))}
              />
            </div>

            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="Postal Code / ZIP"
                maxLength={10}
                value={formData.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value.replace(/[^0-9]/g, ''))}
              />

              <input
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={(e) =>
                  handleChange('country', e.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />
            </div>

            <div className="cxo-form-row">
              <select
                value={formData.companyCategory}
                onChange={(e) => handleChange('companyCategory', e.target.value)}
              >
                <option value="">Company Category</option>
                <option value="enterprise">Enterprise</option>
                <option value="startup">Startup</option>
                <option value="government">Government</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                placeholder="Business Vertical"
                value={formData.businessVertical}
                onChange={(e) => handleChange('businessVertical', e.target.value)}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
}
