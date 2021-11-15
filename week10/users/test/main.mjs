import {expect} from 'chai';
import User from '../user-serialize.mjs';

describe('My first tests', function () {
  it('One is a number!', function () {
    let one = 1;
    expect(one).to.be.a('number');
  });

  it('String tests', function () {
    let string = 'hello world';
    expect(string).to.be.a('string');
    expect(string).to.not.be.empty;
    expect(string.length).to.eq(11);
  });
});

describe('Fetching users', function () {
  it('Getting an existing user', async function () {
    let user = await User.get('ujankovic');
    expect(user).to.be.a('object');
    expect(user).to.not.be.empty;
    expect(user).to.have.property('username');
  });

  it('Getting a non existing user', async function () {
    let user = await User.get('000000');

    expect(user).to.be.null;
  });
});

describe('Checking password users', function () {
  let password = 'password',
      username = 'ujankovic';

  it('Checking that passwords match', async function () {
    let user = await User.check(username, password);

    expect(user).to.be.a('boolean');
    expect(user).to.eq(true)
  });

  it('Checking that invalid passwords fail.', async function () {
    let user = await User.check(username, '561r37123');
    expect(user).to.be.a('boolean');
    expect(user).to.eq(false)
  });
});


after(function () {
  User.close();
})
