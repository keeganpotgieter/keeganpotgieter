import config from '../../../config.json';
import packageJson from '../../../package.json';
import themes from '../../../themes.json';
import { formatDistanceToNow } from 'date-fns';

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

type OS = 'Unknown' | 'Windows' | 'MacOS' | 'Linux';
const getPlatform = (): OS => {
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

  return os;
};

const getMainColor = () => {
  const platform = getPlatform();
  const themeName = localStorage.getItem('theme');
  const theme = themes.find((theme) => theme.name.toLowerCase() === themeName);

  switch (platform) {
    case 'MacOS':
      return theme?.cyan || 'cyan';
    case 'Windows':
      return theme?.blue || 'blue';
    case 'Linux':
      return theme?.red || 'red';
    case 'Unknown':
      return theme?.green || 'green';
  }
};

const getArt = () => {
  const platform = getPlatform();
  const mainColor = getMainColor();

  switch (platform) {
    case 'MacOS':
      return `<p style="color: ${mainColor}">${macos}</p>`;
    case 'Windows':
      return `<p style="color: ${mainColor}">${windows}</p>`;
    case 'Linux':
      return `<p style="color: ${mainColor}">${linux}</p>`;
    case 'Unknown':
      return `<p style="color: ${mainColor}">${unknown}</p>`;
  }
};

const getInfo = () => {
  const os = getPlatform();
  const visitedAt = new Date(
    localStorage.getItem('visitedAt') || new Date().toString(),
  );
  const hostname = window.location.hostname;
  const theme = localStorage.getItem('theme');
  const resolution = `${window.screen.availWidth}x${window.screen.availHeight}`;
  const packages = Object.keys(packageJson.dependencies);
  const devPackages = Object.keys(packageJson.devDependencies);
  const mainColor = getMainColor();

  let message = '';

  message += `<span style="color: ${mainColor}">Host</span>: ${hostname}\n`;
  message += `<span style="color: ${mainColor}">OS</span>: ${os}\n`;
  message += `<span style="color: ${mainColor}">Packages</span>: ${
    packages.length + devPackages.length
  } (npm)\n`;
  message += `<span style="color: ${mainColor}">Resolution</span>: ${resolution}\n`;
  message += `<span style="color: ${mainColor}">Shell</span>: TODO\n`;
  message += `<span style="color: ${mainColor}">Theme</span>: ${theme}\n`;
  // message += `<span style="color: ${mainColor}">License</span>: ${packageJson.l}\n`;
  message += `<span style="color: ${mainColor}">Version</span>: ${packageJson.version}\n`;
  message += `<span style="color: ${mainColor}">Repo</span>: <a href="${packageJson.repository.url}" target="_blank">${config.social.github}</a>\n`;
  message += `<span style="color: ${mainColor}">Uptime</span>: ${formatDistanceToNow(
    visitedAt,
  )}\n`;
  message += `<span style="color: ${mainColor}">Author</span>: ${packageJson.author.name}\n`;

  return message;
};

export const neofetch = async () => {
  const art = getArt();
  const info = getInfo();

  // return (
  //   <div className='flex flex-col items-center justify-center md:flex-row'>
  //     <div className='mb-4 w-full text-center md:mb-0 md:w-1/2 md:text-left'>
  //       <div dangerouslySetInnerHTML={{ __html: art }} />
  //     </div>
  //     <div className='w-full text-center md:w-1/2 md:text-left'>
  //       <pre dangerouslySetInnerHTML={{ __html: info }} />
  //     </div>
  //   </div>
  // );

  return `
  <div class="md:flex md:flex-row flex flex-col gap-4 justify-center items-center">
    <div class="flex-1 w-full leading-[0.5rem] text-[8px] flex justify-center">${art}</div>
    <div class="flex-1 md:w-1/2 w-full">${info}</div>
  </div>
  `;

  // return `
  // <table>
  //   <tr>
  //     <td>${art}</td>
  //     <td style="width: 'fit-content';">${info}</td>
  //   <tr>
  // </table>
  // `;
};

neofetch.description = 'Get system information';
