import { FormEvent, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { NatyaWordmark } from 'app/components/NatyaWordmark';

const PASSWORD_HASH =
  'e0aad69782358afc46734d73847dbc8508efd5194e77797a4fbb94bad7f4cfdc';
const STORAGE_KEY = 'natya-demo-access';

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value),
  );
  const bytes = new Uint8Array(digest);
  let hex = '';
  for (let index = 0; index < bytes.length; index += 1) {
    hex += bytes[index].toString(16).padStart(2, '0');
  }
  return hex;
};

export const demoIsUnlocked = () =>
  window.localStorage.getItem(STORAGE_KEY) === PASSWORD_HASH;

export const DemoGate = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(demoIsUnlocked);
  const [password, setPassword] = useState('');
  const [wrong, setWrong] = useState(false);
  const [checking, setChecking] = useState(false);

  if (process.env.NODE_ENV !== 'production' || open) return <>{children}</>;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setChecking(true);
    const hash = await sha256(password);
    setChecking(false);
    if (hash !== PASSWORD_HASH) {
      setWrong(true);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, hash);
    setOpen(true);
  };

  return (
    <Screen>
      <Card onSubmit={submit}>
        <NatyaWordmark />
        <p>This preview is private. Enter the password to continue.</p>
        <input
          type="password"
          autoFocus
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          aria-label="Password"
          onChange={event => {
            setPassword(event.target.value);
            setWrong(false);
          }}
        />
        {wrong && <Error>That password is not right.</Error>}
        <button type="submit" disabled={checking || password.length === 0}>
          Continue
        </button>
      </Card>
    </Screen>
  );
};

const Screen = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #090909;
  color: #f6f3ee;
`;

const Card = styled.form`
  width: min(420px, 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  p {
    margin: 0;
    color: rgba(246, 243, 238, 0.78);
    line-height: 1.5;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 4px;
    padding: 14px 12px;
    background: #141414;
    color: #f6f3ee;
    font: inherit;
  }
  button {
    border: 0;
    border-radius: 4px;
    padding: 12px 18px;
    background: #f4f1ea;
    color: #121212;
    font: inherit;
    font-weight: 650;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const Error = styled.span`
  color: #ffb4b4;
  font-size: 14px;
`;
