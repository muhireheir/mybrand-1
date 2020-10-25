/* eslint-disable consistent-return */
import { pick } from 'lodash';
import AuthTokenHelper from '../../helpers/AuthTokenHelper';
import Util from '../../helpers/utils';
import userService from '../../services/userService';

const util = new Util();
const googleAuth = async (req, res) => {
  const { emails, displayName } = req.user;
  const currentUser = await userService.findByEmail(emails[0].value);
  if (currentUser !== null) {
    if (currentUser.isVerified === false) {
      util.message = 'Please Verify your account';
      util.statusCode = 400;
      return util.send(res);
    }
    const displayData = pick(currentUser.dataValues, ['id', 'firstName', 'lastName', 'email', 'socialId', 'provider']);
    const authToken = AuthTokenHelper.generateToken(displayData);
    userService.updateAtt({ authToken }, { email: displayData.email });
    util.message = `${displayName} was succesfully logged in`;
    util.statusCode = 200;
    util.data = { displayData, authToken };
    util.type = 'success';
    return util.send(res);
  }
  if (currentUser === null) {
    util.message = 'Account not Found';
    util.statusCode = 400;
    return util.send(res);
  }
};

export default googleAuth;