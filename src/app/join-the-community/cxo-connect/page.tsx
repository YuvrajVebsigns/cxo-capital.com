// 'use client';

// import React, { FormEvent, useState } from 'react';
// import { submitCxoNetworkApplication } from '@/services/attendees.service';

// const eligibleTitles = [
//   'CIOs – Chief Information Officers',
//   'CTOs – Chief Technology Officers',
//   'CDOs – Chief Digital Officers',
//   'CDOs – Chief Data Officers',
//   'CISOs – Chief Information Security Officers',
//   'ITDMs – Senior Most Information Technology Decision Makers',
// ];

// export default function CxoConnectPage() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     title: '',
//     designation: '',
//     officialEmail: '',
//     telephone: '',
//     mobile: '',
//     linkedin: '',
//     companyName: '',
//     companyAddress: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     country: '',
//     companyCategory: '',
//     businessVertical: '',
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const handleChange = (field: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setSubmitting(true);
//     setSubmitError(null);
//     setSubmitSuccess(false);

//     try {
//       if (!formData.designation.trim()) {
//         throw new Error('Current Designation is required.');
//       }

//       if (!formData.officialEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.officialEmail)) {
//         throw new Error('Please enter a valid email address.');
//       }

//       await submitCxoNetworkApplication({
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         title: formData.title,
//         currentDesignation: formData.designation,
//         email: formData.officialEmail,
//         telephoneNo: formData.telephone,
//         cioMobilePhone: formData.mobile,
//         linkedInLink: formData.linkedin,
//         companyName: formData.companyName,
//         companyAddress: formData.companyAddress,
//         city: formData.city,
//         state: formData.state,
//         postalCode: formData.postalCode,
//         country: formData.country,
//         companyCategory: formData.companyCategory,
//         businessVertical: formData.businessVertical,
//       });
//       setSubmitSuccess(true);
//       setFormData({
//         firstName: '',
//         lastName: '',
//         title: '',
//         designation: '',
//         officialEmail: '',
//         telephone: '',
//         mobile: '',
//         linkedin: '',
//         companyName: '',
//         companyAddress: '',
//         city: '',
//         state: '',
//         postalCode: '',
//         country: '',
//         companyCategory: '',
//         businessVertical: '',
//       });
//     } catch (error: unknown) {
//       setSubmitError(
//         error instanceof Error ? error.message : 'Unable to submit your application. Please try again.',
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // console.log(formData);

//   return (
//     <main className="cxo-join-page">
//       <section className="cxo-join-hero">
//         <div className="cxo-join-container">
//           <p className="cxo-join-breadcrumb">Join Us</p>
//           <h1>CXO Connect</h1>
//         </div>
//       </section>

//       <section className="cxo-join-section">
//         <div className="cxo-join-container cxo-join-grid">
//           <div className="cxo-join-content">
//             <span className="cxo-join-label">CXO Hub Network</span>
//             <h2>Dear CXO,</h2>

//             <p>
//               We invite <strong>YOU</strong> to join our network. I look forward to forging a
//               mutually beneficial and collaborative partnership.
//             </p>

//             <p>
//               Thank you for entrusting us with the opportunity to contribute to your success.
//               Together, we will shape a future where technology empowers and connects us all.
//             </p>

//             <div className="cxo-join-signature">
//               <p>Regards,</p>
//               <h3>Anoop Mathur</h3>
//             </div>

//             <div className="cxo-eligible-box">
//               <h3>CXO Titles Eligible to Join the Network:</h3>
//               <ul>
//                 {eligibleTitles.map((title) => (
//                   <li key={title}>{title}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <form className="cxo-join-form" onSubmit={handleSubmit}>
//             <h2>Join the Network</h2>
//             {submitSuccess && <p className="form-success">Your application has been submitted successfully.</p>}
//             {submitError && <p className="form-error">{submitError}</p>}

//             <div className="cxo-form-row">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={(e) =>
//                   handleChange('firstName', e.target.value.replace(/[^A-Za-z\s]/g, ''))
//                 }
//               />

//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={(e) =>
//                   handleChange('lastName', e.target.value.replace(/[^A-Za-z\s]/g, ''))
//                 }
//               />
//             </div>

//             <div className="cxo-form-row">
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={(e) => handleChange('title', e.target.value.replace(/[^A-Za-z\s.]/g, ''))}
//               />

//               <input
//                 type="text"
//                 placeholder="Current Designation"
//                 value={formData.designation}
//                 onChange={(e) => handleChange('designation', e.target.value)}
//               />
//             </div>

//             <div className="cxo-form-row">
//               <input
//                 type="email"
//                 placeholder="Email (Official)"
//                 value={formData.officialEmail}
//                 onChange={(e) => handleChange('officialEmail', e.target.value)}
//               />

//               <input
//                 type="tel"
//                 placeholder="Telephone No"
//                 maxLength={20}
//                 value={formData.telephone}
//                 onChange={(e) => handleChange('telephone', e.target.value.replace(/[^0-9+\s]/g, ''))}
//               />
//             </div>

//             <div className="cxo-form-row">
//               <input
//                 type="tel"
//                 placeholder="CIO Mobile Phone"
//                 maxLength={20}
//                 value={formData.mobile}
//                 onChange={(e) => handleChange('mobile', e.target.value.replace(/[^0-9+\s]/g, ''))}
//               />

//               <input
//                 type="url"
//                 placeholder="LinkedIn Link"
//                 value={formData.linkedin}
//                 onChange={(e) => handleChange('linkedin', e.target.value)}
//               />
//             </div>

//             <div className="cxo-form-row">
//               <input
//                 type="text"
//                 placeholder="Company Name"
//                 value={formData.companyName}
//                 onChange={(e) => handleChange('companyName', e.target.value)}
//               />

//               <textarea
//                 className="company-address-field"
//                 placeholder="Company Address"
//                 rows={1}
//                 value={formData.companyAddress}
//                 onChange={(e) => handleChange('companyAddress', e.target.value)}
//               />
//             </div>

//             <div className="cxo-form-row">
//               <input
//                 type="text"
//                 placeholder="City"
//                 value={formData.city}
//                 onChange={(e) => handleChange('city', e.target.value.replace(/[^A-Za-z\s]/g, ''))}
//               />

//               <input
//                 type="text"
//                 placeholder="State"
//                 value={formData.state}
//                 onChange={(e) => handleChange('state', e.target.value.replace(/[^A-Za-z\s]/g, ''))}
//               />
//             </div>

//             <div className="cxo-form-row">
//               <input
//                 type="text"
//                 placeholder="Postal Code / ZIP"
//                 maxLength={10}
//                 value={formData.postalCode}
//                 onChange={(e) => handleChange('postalCode', e.target.value.replace(/[^0-9]/g, ''))}
//               />

//               <input
//                 type="text"
//                 placeholder="Country"
//                 value={formData.country}
//                 onChange={(e) =>
//                   handleChange('country', e.target.value.replace(/[^A-Za-z\s]/g, ''))
//                 }
//               />
//             </div>

//             <div className="cxo-form-row">
//               <select
//                 value={formData.companyCategory}
//                 onChange={(e) => handleChange('companyCategory', e.target.value)}
//               >
//                 <option value="">Company Category</option>
//                 <option value="enterprise">Enterprise</option>
//                 <option value="startup">Startup</option>
//                 <option value="government">Government</option>
//                 <option value="education">Education</option>
//                 <option value="other">Other</option>
//               </select>

//               <input
//                 type="text"
//                 placeholder="Business Vertical"
//                 value={formData.businessVertical}
//                 onChange={(e) => handleChange('businessVertical', e.target.value)}
//               />
//             </div>

//             <button type="submit" disabled={submitting}>
//               {submitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import React, { FormEvent, useState } from 'react';
import { submitCxoNetworkApplication } from '@/services/attendees.service';

const eligibleTitles = [
  'CIOs – Chief Information Officers',
  'CTOs – Chief Technology Officers',
  'CDOs – Chief Digital Officers',
  'CDOs – Chief Data Officers',
  'CISOs – Chief Information Security Officers',
  'ITDMs – Senior Most Information Technology Decision Makers',
];

/**
 * Website ID required by the backend.
 *
 * Add this to .env.local:
 *
 * NEXT_PUBLIC_WEBSITE_ID=507f1f77bcf86cd799439012
 *
 * Replace the value with your actual websiteId.
 */
const WEBSITE_ID = process.env.NEXT_PUBLIC_WEBSITE_ID || '';

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

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    /**
     * Website ID is required by backend.
     */
    if (!WEBSITE_ID) {
      setSubmitError(
        'Website ID is missing. Please configure NEXT_PUBLIC_WEBSITE_ID in .env.local.',
      );
      setSubmitting(false);
      return;
    }

    try {
      await submitCxoNetworkApplication({
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,

        designation: formData.designation,
        officialEmail: formData.officialEmail,
        telephone: formData.telephone,
        mobile: formData.mobile,
        linkedin: formData.linkedin,

        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,

        companyCategory: formData.companyCategory,
        businessVertical: formData.businessVertical,

        websiteId: WEBSITE_ID,
      });

      setSubmitSuccess(true);

      setFormData({
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
    } catch (error: unknown) {
      // console.error('CXO Network submission error:', error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to submit your application. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

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
          {/* ---------------------------------------------------------------- */}
          {/* LEFT CONTENT                                                     */}
          {/* ---------------------------------------------------------------- */}

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

          {/* ---------------------------------------------------------------- */}
          {/* FORM                                                              */}
          {/* ---------------------------------------------------------------- */}

          <form className="cxo-join-form" onSubmit={handleSubmit}>
            <h2>Join the Network</h2>

            {submitSuccess && (
              <p className="form-success">Your application has been submitted successfully.</p>
            )}

            {submitError && <p className="form-error">{submitError}</p>}

            {/* First Name / Last Name */}
            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                required
                onChange={(e) =>
                  handleChange('firstName', e.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />

              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                required
                onChange={(e) =>
                  handleChange('lastName', e.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />
            </div>

            {/* Title / Designation */}
            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                required
                onChange={(e) => handleChange('title', e.target.value.replace(/[^A-Za-z\s.]/g, ''))}
              />

              <input
                type="text"
                placeholder="Current Designation"
                value={formData.designation}
                required
                onChange={(e) => handleChange('designation', e.target.value)}
              />
            </div>

            {/* Email / Telephone */}
            <div className="cxo-form-row">
              <input
                type="email"
                placeholder="Email (Official)"
                value={formData.officialEmail}
                required
                onChange={(e) => handleChange('officialEmail', e.target.value)}
              />

              <input
                type="tel"
                placeholder="Telephone No"
                maxLength={10}
                value={formData.telephone}
                required
                onChange={(e) => handleChange('telephone', e.target.value.replace(/[^0-9]/g, ''))}
              />
            </div>

            {/* Mobile / LinkedIn */}
            <div className="cxo-form-row">
              <input
                type="tel"
                placeholder="CIO Mobile Phone"
                maxLength={10}
                value={formData.mobile}
                required
                onChange={(e) => handleChange('mobile', e.target.value.replace(/[^0-9]/g, ''))}
              />

              <input
                type="url"
                placeholder="LinkedIn Link"
                value={formData.linkedin}
                required
                onChange={(e) => handleChange('linkedin', e.target.value)}
              />
            </div>

            {/* Company Name / Address */}
            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="Company Name"
                value={formData.companyName}
                required
                onChange={(e) => handleChange('companyName', e.target.value)}
              />

              <textarea
                className="company-address-field"
                placeholder="Company Address"
                rows={1}
                value={formData.companyAddress}
                required
                onChange={(e) => handleChange('companyAddress', e.target.value)}
              />
            </div>

            {/* City / State */}
            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                required
                onChange={(e) => handleChange('city', e.target.value.replace(/[^A-Za-z\s]/g, ''))}
              />

              <input
                type="text"
                placeholder="State"
                value={formData.state}
                required
                onChange={(e) => handleChange('state', e.target.value.replace(/[^A-Za-z\s]/g, ''))}
              />
            </div>

            {/* Postal Code / Country */}
            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="Postal Code / ZIP"
                maxLength={10}
                value={formData.postalCode}
                required
                onChange={(e) => handleChange('postalCode', e.target.value.replace(/[^0-9]/g, ''))}
              />

              <input
                type="text"
                placeholder="Country"
                value={formData.country}
                required
                onChange={(e) =>
                  handleChange('country', e.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />
            </div>

            {/* Company Category / Business Vertical */}
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

            {/* Submit */}
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
