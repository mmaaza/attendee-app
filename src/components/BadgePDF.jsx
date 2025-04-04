import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  content: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: '#475569',
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  qrSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  qrCode: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#475569',
    fontSize: 10,
  },
});

const BadgePDF = ({ data }) => {
  const qrDataUrl = React.useMemo(async () => {
    try {
      return await QRCode.toDataURL(data.qrCodeUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
      return null;
    }
  }, [data.qrCodeUrl]);

  if (!qrDataUrl) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.title}>Dental Trade Show 2025</Text>
            <Text style={styles.subtitle}>Attendee Badge</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>Registration ID</Text>
            <Text style={styles.value}>{data.id}</Text>

            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{data.name}</Text>

            <Text style={styles.label}>Company</Text>
            <Text style={styles.value}>{data.company}</Text>

            <Text style={styles.label}>Job Title</Text>
            <Text style={styles.value}>{data.jobTitle}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{data.email}</Text>
          </View>

          <View style={styles.qrSection}>
            <Text style={styles.label}>Scan QR Code for Digital Pass</Text>
            <Image style={styles.qrCode} src={qrDataUrl} />
          </View>

          <View style={styles.footer}>
            <Text>April 18-20, 2025 • Kathmandu, Nepal</Text>
            <Text>Powered by NepDent</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BadgePDF;