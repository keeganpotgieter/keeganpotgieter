import config from '../../../config.json';
import packageJson from '../../../package.json';
import themes from '../../../themes.json';

const macos = `
                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.    
 XMMMMMMMMMMMMMMMMMMMMMMMX.      
;MMMMMMMMMMMMMMMMMMMMMMMM:       
:MMMMMMMMMMMMMMMMMMMMMMMM:       
.MMMMMMMMMMMMMMMMMMMMMMMMX.      
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.    
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk   
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.   
    kMMMMMMMMMMMMMMMMMMMMMMd     
     ;KMMMMMMMWXXWMMMMMMMk.      
       .cooc,.    .,coo:.        
`;

const windows = `
                                ..,
                    ....,,:;+ccllll
      ...,,+:;  cllllllllllllllllll
,cclllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
                                      
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
\`'ccllllllllll  lllllllllllllllllll
       \`' \*::  :ccllllllllllllllll
                       \`\`\`\`''*::cll
`;

const linux = `
            .-/+oossssoo+/-.               
        \`:+ssssssssssssssssss+:\`           
      -+ssssssssssssssssssyyssss+-         
    .ossssssssssssssssssdMMMNysssso.       
   /ssssssssssshdmmNNmmyNMMMMhssssss/      
  +ssssssssshmydMMMMMMMNddddyssssssss+     
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    
  +sssssssssdmydMMMMMMMMddddyssssssss+     
   /ssssssssssshdmNNNNmyNMMMMhssssss/      
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.
`;

const unknown = `              _-o#&&*''''?d:>.\_
          _o/"\`''  '',, dMF9MMMMMHo_
       .o&#'        \`"MbHMMMMMMMMMMMHo.
     .o"" '         vodM*$&&HMMMMMMMMMM?.
    ,'              $M&ood,~'\`(&##MMMMMMH\\
   /               ,MMMMMMM#b?#bobMMMMHMMML
  &              ?MMMMMMMMMMMMMMMMM7MMM$R*Hk
 ?$.            :MMMMMMMMMMMMMMMMMMM/HMMM|\`*L
|               |MMMMMMMMMMMMMMMMMMMMbMH'   T,
$H#:            \`*MMMMMMMMMMMMMMMMMMMMb#}'  \`?
]MMH#             ""*""""*#MMMMMMMMMMMMM'    -
MMMMMb_                   |MMMMMMMMMMMP'     :
HMMMMMMMHo                 \`MMMMMMMMMT       .
?MMMMMMMMP                  9MMMMMMMM}       -
.?MMMMMMM                  |MMMMMMMMM?,d-    '
 :|MMMMMM-                 \`MMMMMMMT .M|.   :
  .9MMM[                    &MMMMM*' \`'    .
   :9MMk                    \`MMM#"        -
     &M}                     \`          .-
      \`&.                             .
        \`~,   .                     ./
            . _                  .-
              '\`--._,dd###pp=""'
`;

const ASSETS = {
  linux,
  macos,
  windows,
  unknown,
} as const;

const STACK = ['React', 'Typescript', 'NextJS'];

type OS = 'Unknown' | 'Windows' | 'MacOS' | 'Linux';
const getPlatform = () => {
  let os: OS = 'Unknown';

  if (navigator.userAgent.indexOf('Win') != -1) {
    os = 'Windows';
  }

  if (navigator.userAgent.indexOf('Mac') != -1) {
    os = 'MacOS';
  }

  if (navigator.userAgent.indexOf('Linux') != -1) {
    os = 'Linux';
  }

  const asset = ASSETS[os.toLowerCase() as keyof typeof ASSETS];

  return { os, asset } as const;
};

const getMainColor = () => {
  const { os } = getPlatform();
  const themeName = localStorage.getItem('theme');
  const theme = themes.find((theme) => theme.name.toLowerCase() === themeName);

  let colour;

  switch (os) {
    case 'MacOS':
      colour = theme?.cyan || 'cyan';
      break;
    case 'Windows':
      colour = theme?.blue || 'blue';
      break;
    case 'Linux':
      colour = theme?.red || 'red';
      break;
    case 'Unknown':
      colour = theme?.green || 'green';
      break;
  }

  return { colour, theme } as const;
};

const Info = () => {
  const os = getPlatform();
  const hostname = window.location.hostname;
  const resolution = `${window.screen.availWidth}x${window.screen.availHeight}`;
  const packages = Object.keys(packageJson.dependencies);
  const devPackages = Object.keys(packageJson.devDependencies);
  const { colour, theme } = getMainColor();

  const data = {
    Host: hostname,
    OS: os,
    Packages: packages.length + devPackages.length,
    Resolution: resolution,
    Theme: theme?.name ?? 'default',
    Version: packageJson.version,
    Repo: {
      type: 'url',
      url: packageJson.repository.url,
      text: config.social.github,
    },
    Author: packageJson.author,
    Stack: STACK.join(', '),
  } as const;

  return Object.keys(data).map((key) => {
    const value = data[key as keyof typeof data];

    if (typeof value === 'object' && 'type' in value) {
      switch (value.type) {
        case 'url':
          return (
            <div>
              <span style={{ color: colour }}>{key}</span>:{' '}
              <a href={value.url} target='_blank'>
                {value.text}
              </a>
            </div>
          );
      }
    }

    if (typeof value === 'string') {
      return (
        <div>
          <span style={{ color: colour }}>{key}</span>: {value}
        </div>
      );
    }
  });
};

export const neofetch = async () => {
  const { asset } = getPlatform();
  const { colour } = getMainColor();

  return (
    <div className='flex flex-col items-center justify-center gap-4 py-4 md:flex md:flex-row'>
      <div className='flex w-full flex-1 justify-center text-[8px] leading-[0.5rem]'>
        <p style={{ color: colour }}>{asset}</p>
      </div>
      <div className='w-full flex-1 md:w-1/2'>
        <Info />
      </div>
    </div>
  );
};

neofetch.description = 'Get system information';
