import minimist from 'minimist';

export function printHelp(): void {
  console.log('usage :');

  console.log('season [winter|summer] NOC medal_name [gold|silver|bronze] (in any order)');
  console.log('season [winter|summer] year medal_type [gold|silver|bronze] (in any order)');

  console.log('./stat medals summer ukr ');
  console.log('./stat medals silver UKR winter');
  console.log('./stat top-teams silver winter');
  console.log('./stat top-teams winter');
}

export function getCLIParams() {
  return minimist(process.argv.slice(2), {
    boolean: ['help'],
  });
}
