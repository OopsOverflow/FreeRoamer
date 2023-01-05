import React from 'react';
import { Center } from '@chakra-ui/react';
import DashboardLayout from '@layouts/DashboardLayout';

function Account() {
  return (
    <Center>
      <h1>This Page is still under construction :)</h1>
    </Center>
  );
}

Account.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Account;
