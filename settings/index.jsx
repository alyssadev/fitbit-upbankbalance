function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Up Bank Token</Text>}>
        <TextInput
          label="Token"
          settingsKey="token"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
