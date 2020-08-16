import React from 'react';
import styles from './badge.module.scss'

function Badge({ name, onClick, selected }) {
    const clickHandler = (e) => {
        return onClick(e)
    }
    
    const badgeURLs = {
        'manchester_city': 'https://gdurl.com/IUtW',
        'liverpool_fc': 'https://gdurl.com/6ic9',
        'chelsea_fc': 'https://gdurl.com/SsKO',
        'tottenham_hotspur':'https://gdurl.com/7aEf',
        'manchester_united': 'https://gdurl.com/Ukpk',
        'arsenal_fc': 'https://gdurl.com/c-oF',
        'leicester_city': 'https://gdurl.com/NwVi',
        'everton_fc': 'https://gdurl.com/vi5JQ',
        'wolverhampton_wanderers':'https://gdurl.com/89Pk',
        'west_ham_united':'https://gdurl.com/Dn7I',
        'afc_bournemouth': 'https://gdurl.com/YTww',
        'newcastle_united': 'https://gdurl.com/RraSF',
        'aston_villa': 'https://gdurl.com/By4r',
        'brighton_&_hove_albion': 'https://gdurl.com/4U4O',
        'watford_fc':'https://gdurl.com/6pz4',
        'southampton_fc':'https://gdurl.com/QUX8',
        'crystal_palace': 'https://gdurl.com/2s1n',
        'burnley_fc': 'https://gdurl.com/n8qL',
        'norwich_city': 'https://gdurl.com/kqTVM',
        'sheffield_united': 'https://gdurl.com/4ls0',
    }

    return (
        <a onClick={clickHandler} href="" data-team={name} className={[styles.logo, selected === name ? styles.selected : ''].join(' ')}>
            <img src={badgeURLs[name]} alt="badge" />
        </a>
    );
}

export default Badge;