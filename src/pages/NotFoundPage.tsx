import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardActions, CardContent } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <CardContent>
        <Box textAlign='center'>お探しのページが見つかりませんでした。</Box>
      </CardContent>
      <CardActions>
        <Box width='100%' textAlign='center'>
          <Button size='small' color='primary' component={Link} to='/' startIcon={<HomeIcon />}>
            ホームへ
          </Button>
        </Box>
      </CardActions>
    </>
  );
};

export default NotFoundPage;
