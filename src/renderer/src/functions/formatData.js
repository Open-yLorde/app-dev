function formatData(data) {
  const formatedData = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  })
    .format(new Date(data))
    .replace(',', ' às')
  return formatedData
}

export default formatData;