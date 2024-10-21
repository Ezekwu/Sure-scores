
import {Html, Head, Body, Container, Text, Button, Section} from '@react-email/components';
import Logo from '@/public/assets/svg/Logo';

interface Props {
  inviter: string;
  companyName: string;
  token: string;
}

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    letterSpacing: '0.6px',
    backgroundColor: '#3f8cff10',
    padding: '1.5rem',
    borderRadius: '4px',
    marginTop: '2rem',
  },
  logoContainer: {
    marginBottom: '2rem',
    display: 'flex',
  },
  logo: {
    marginBottom: '10px',
  },
  logoText: {
    fontWeight: '700',
    fontSize: '1.2rem',
    display: 'inline',
    color: '#0A1629',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginBottom: '3rem',
    color: '#0A1629',
  },

  mainText: {
    color: '#7D8592',
    fontSize: '14px',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#3F8CFF',
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    padding: '13px 20px',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },

  boldText: {
    fontWeight: 'bold',
    display: 'inline',
  },
  rights: {
    color: '#7D8592',
    fontSize: '14px',
    marginTop: '3rem',
    textAlign: 'center',
  },
};


export default function InviteTemplate({ companyName, inviter, token }: Props) {
  const year = new Date().getFullYear()
  
  return (
    <Html>
      <Head />
      <Body>
        <Container style={styles.container}>
          <Container style={styles.logoContainer}>
            <Container style={styles.logo}>
              <Logo />
            </Container>
            <Text style={styles.logoText}>WorkRoom</Text>
          </Container>
          <Section style={styles.headerText}>
            {inviter} has invited you to join {companyName}{' '}
          </Section>
          <Section style={styles.mainText}>
            Collaborate with <Text style={styles.boldText}>{inviter}</Text> in a
            company called <Text style={styles.boldText}>{companyName}</Text>{' '}
          </Section>
          <Button
            //@ts-ignore
            style={styles.button}
            href={`http://localhost:3000/invite?token=${token}`}
          >
            Join
          </Button>
        </Container>
        <Container
          //@ts-ignore
          style={styles.rights}
        >
          &copy;{year} WorkRoom Technologies All rights reserved.
        </Container>
      </Body>
    </Html>
  );
}
