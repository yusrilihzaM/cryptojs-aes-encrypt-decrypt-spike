import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import * as CryptoJS from 'crypto-js';
import * as CryptoJS from 'crypto-js';
const iv = CryptoJS.lib.WordArray.random(16);
const ivBytes = CryptoJS.enc.Base64.parse('1235467812354678');
const configAES = {
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
  iv: ivBytes,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      inputKey: '',
      encryptedBase64Input: '',
      encryptedBase64: '',
      decryptKey: '',
      decryptedText: '',
    };
  }

  encryptAES = (text, key) => {
    var encrypted = CryptoJS.AES.encrypt(text, '1111111111111111', {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: iv,
    }).toString();
    const encryptedPassword = encrypted.toString();
    const ivString = CryptoJS.enc.Base64.stringify(iv);

    console.log('Ciphertext:', encryptedPassword);
    console.log('IVBase64:', iv);
    console.log('IV:', ivString);

    return encryptedPassword;
  };

  decryptAES = (encryptedBase64, key) => {
    const decrypted = CryptoJS.AES.decrypt(
      encryptedBase64,
      '1111111111111111',
      {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv,
      }
    );
    if (decrypted) {
      try {
        console.log(decrypted);
        const str = decrypted.toString(CryptoJS.enc.Utf8);
        if (str.length > 0) {
          return str;
        }
        if (str.length <= 0) {
          return 'error kata kurang dari 1';
        }
      } catch (e) {
        return 'error exception : ' + e;
      }
    }
    return 'error tidak bisa di cdecript';
  };

  handleInputTextChange = (event) => {
    this.setState(
      {
        inputText: event.target.value,
      },
      this.encryptInputText
    );
  };

  handleInputKeyChange = (event) => {
    this.setState(
      {
        inputKey: event.target.value,
      },
      this.encryptInputText
    );
  };

  encryptInputText = () => {
    this.setState({
      encryptedBase64Input: this.encryptAES(
        this.state.inputText,
        this.state.inputKey
      ),
    });
  };

  handleDecryptKeyChange = (event) => {
    this.setState(
      {
        decryptKey: event.target.value,
      },
      this.decryptOutputText
    );
  };

  handleMsgChange = (event) => {
    this.setState(
      {
        encryptedBase64: event.target.value,
      },
      this.decryptOutputText
    );
  };

  decryptOutputText = () => {
    this.setState({
      outputText: this.decryptAES(
        this.state.encryptedBase64,
        this.state.decryptKey
      ),
    });
  };
  render() {
    const { error, transactions, isLoading } = this.state;
    if (error) {
      return <h3>{error}</h3>;
    }
    return (
      <>
        <h1>Crypto-JS encryptAES</h1>
        <div className="form-group">
          <input
            className="form-control"
            value={this.state.inputText}
            onChange={this.handleInputTextChange}
            style={{ width: '40%', height: 40, marginRight: 20 }}
            placeholder="Input Text"
          />
          <input
            className="form-control"
            value={this.state.inputKey}
            onChange={this.handleInputKeyChange}
            style={{ width: '40%', height: 40 }}
            placeholder="Key"
          />
        </div>

        <pre className="output">
          <code>{this.state.encryptedBase64Input}</code>
        </pre>

        <h1>Crypto-JS decryptAES</h1>
        <div className="form-group">
          <input
            className="form-control"
            value={this.state.encryptedBase64}
            onChange={this.handleMsgChange}
            style={{ width: '40%', height: 40, marginRight: 20 }}
            placeholder="Encrypted String"
          />
          <input
            className="form-control"
            value={this.state.key}
            onChange={this.handleDecryptKeyChange}
            style={{ width: '40%', height: 40 }}
            placeholder="Key"
          />
        </div>

        <pre className="output">
          <code>{this.state.outputText}</code>
        </pre>
      </>
    );
  }
}

render(<App />, document.getElementById('root'));
