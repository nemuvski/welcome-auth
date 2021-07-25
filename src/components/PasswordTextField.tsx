import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

type Props = {
  onChange: (event: any) => void;
  value: any;
  className?: string;
  label?: string;
  helperText?: string;
};

const PasswordTextField: React.FC<Props> = ({ className, onChange, value, label = 'パスワード', helperText }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      className={className}
      variant='outlined'
      label={label}
      type={showPassword ? 'text' : 'password'}
      size='small'
      helperText={helperText}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      required
    />
  );
};

export default PasswordTextField;
