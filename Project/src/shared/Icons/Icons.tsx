import React from 'react';
import classNames from 'classnames';
import styles from './icons.css';
import { HeaderLogo } from './HeaderLogo';
import { HeaderStatistics } from './HeaderStatistics';
import { MenuListBtn } from './MenuListBtn';
import { DropdownUrn } from './DropdownUrn';
import { DropdownEdit } from './DropdownEdit';
import { DropdownMinus } from './DropdownMinus';
import { DropdownPlus } from './DropdownPlus';
import { StatisticsLazyTomato } from './StatisticsLazyTomato';
import { StatisticsFocus } from './StatisticsFocus';
import { StatisticsPause } from './StatisticsPause';
import { StatisticsStop } from './StatisticsStop';
import { StatisticsPomidorsTrue } from './StatisticsPomidorTrue';
import { StatisticsLineWeek } from './StatisticsLineWeek';
import { ModalClose } from './ModalClose';

const LIST = {
  logo: HeaderLogo,
  statistics: HeaderStatistics,
  menu: MenuListBtn,
  urn: DropdownUrn,
  edit: DropdownEdit,
  minus: DropdownMinus,
  plus: DropdownPlus,
  LazyTomato: StatisticsLazyTomato,
  timeFocus: StatisticsFocus,
  timePause: StatisticsPause,
  timeStop: StatisticsStop,
  pomidorTrue: StatisticsPomidorsTrue,
  lineWeek: StatisticsLineWeek,
  modalClose: ModalClose,
}

export enum EName {
  logo = 'logo',
  statistics = 'statistics',
  menu = 'menu',
  urn = 'urn',
  edit = 'edit',
  minus = 'minus',
  plus = 'plus',
  LazyTomato = 'LazyTomato',
  timeFocus = 'timeFocus',
  timePause = 'timePause',
  timeStop = 'timeStop',
  pomidorTrue = 'pomidorTrue',
  lineWeek = 'lineWeek',
  modalClose = 'modalClose'
}

interface IIconsProps {
  name: EName;
  size?: number;
  className?: string;
}

export interface IIconProps {
  size?: number;
  className?: string;
}

export function Icons({ name, size, className }: IIconsProps) {
  const classes = classNames({ [styles[`size${size}`]]: size });
  const IconComponent = LIST[name];
  return <IconComponent size={size} className={className} />;
}