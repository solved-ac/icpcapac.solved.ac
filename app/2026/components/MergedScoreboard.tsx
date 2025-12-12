"use client";

import Region from "@/components/Region";
import { shortenInstitutionName } from "@/utils/institution";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Cell,
  EmptyStatePlaceholder,
  Row,
  Select,
  Space,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tooltip,
  Typo,
} from "@solved-ac/ui-react";
import { IconAlertCircle, IconArrowUp } from "@tabler/icons-react";
import { Fragment, useMemo, useState } from "react";
import { INSTITUTION_REGION_MAP } from "../../data/institutions/institution";
import {
  ChampionshipTeamLike,
  TeamRankInCombinedScoreboardStatus,
} from "../data/types";
import MergedScoreboardTooltip from "./MergedScoreboardTooltip";

const RegionLabelContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 8em;
`;

const RegionLabel = styled.div`
  display: flex;
  flex: 0 0 6em;
  gap: 4px;
`;

const QualifiedCutlineCell = styled(Cell)`
  background-color: ${({ theme }) => theme.color.status.error};
  color: white;
  padding: 0;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.2em;
  font-size: 0.9em;
  padding: 4px 0;
`;

const InvitedCutlineCell = styled(QualifiedCutlineCell)`
  background-color: ${({ theme }) => theme.color.status.warn};
`;

const isTeamInvited = (status: TeamRankInCombinedScoreboardStatus) =>
  status === TeamRankInCombinedScoreboardStatus.D2 ||
  status === TeamRankInCombinedScoreboardStatus.D3_3 ||
  status === TeamRankInCombinedScoreboardStatus.D5 ||
  status === TeamRankInCombinedScoreboardStatus.D4_4;

interface Props {
  teams: ChampionshipTeamLike[];
}

const RegionScoreboard = ({ teams }: Props) => {
  const theme = useTheme();

  const CUTLINE = 70;

  const regionData = useMemo(() => {
    const regionCount = new Map<string, number>();
    const regionOverCutlineCount = new Map<string, number>();

    teams.forEach((team) => {
      const region = INSTITUTION_REGION_MAP.get(team.institution) || "Unknown";
      regionCount.set(region, (regionCount.get(region) || 0) + 1);
      if (team.rank && team.rank !== -1 && team.rank <= CUTLINE) {
        regionOverCutlineCount.set(
          region,
          (regionOverCutlineCount.get(region) || 0) + 1
        );
      }
    });

    return Array.from(regionCount.keys())
      .map((region) => ({
        region,
        total: regionCount.get(region) || 0,
        overCutline: regionOverCutlineCount.get(region) || 0,
      }))
      .sort((a, b) => {
        if (a.region === "Unknown") return 1;
        if (b.region === "Unknown") return -1;
        return b.overCutline - a.overCutline;
      });
  }, [teams]);

  const siteData = useMemo(() => {
    const siteCount = new Map<string, number>();
    const siteOverCutlineCount = new Map<string, number>();

    teams.forEach((team) => {
      const site = team.fromSite;
      siteCount.set(site, (siteCount.get(site) || 0) + 1);
      if (team.rank && team.rank !== -1 && team.rank <= CUTLINE) {
        siteOverCutlineCount.set(
          site,
          (siteOverCutlineCount.get(site) || 0) + 1
        );
      }
    });

    return Array.from(siteCount.keys())
      .map((site) => ({
        site,
        total: siteCount.get(site) || 0,
        overCutline: siteOverCutlineCount.get(site) || 0,
      }))
      .sort((a, b) => {
        return b.overCutline - a.overCutline;
      });
  }, [teams]);

  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [siteFilter, setSiteFilter] = useState<string>("all");

  const { filteredTeams, lastInvitedIndex, lastQualifiedIndex } =
    useMemo(() => {
      const filteredTeams = teams
        .filter(
          (team) =>
            regionFilter === "all" ||
            (INSTITUTION_REGION_MAP.get(team.institution) ?? "Unknown") ===
              regionFilter
        )
        .filter((team) => siteFilter === "all" || team.fromSite === siteFilter);
      const lastInvitedIndex =
        filteredTeams
          .map((team, i) => ({
            status: team.status,
            index: i,
          }))
          .filter((x) => isTeamInvited(x.status))
          .sort((a, b) => b.index - a.index)[0]?.index ?? -1;
      const lastQualifiedIndex =
        filteredTeams
          .map((team, i) => ({
            rank: team.rank && team.rank !== -1 ? team.rank : teams.length + 1,
            index: i,
          }))
          .filter((x) => x.rank <= CUTLINE)
          .sort((a, b) => {
            if (a.rank !== b.rank) return b.rank - a.rank;
            return b.index - a.index;
          })[0]?.index ?? -1;
      return { filteredTeams, lastInvitedIndex, lastQualifiedIndex };
    }, [teams, regionFilter, siteFilter]);

  return (
    <>
      <Select
        value={regionFilter}
        onChange={({ value }) => setRegionFilter(value)}
        items={[
          {
            value: "all",
            label: <RegionLabelContainer>All Regions</RegionLabelContainer>,
          },
          ...regionData.map((data) => ({
            value: data.region,
            label: (
              <RegionLabelContainer>
                <RegionLabel>
                  <Region region={data.region} />
                </RegionLabel>
                <Typo description tabular>
                  {data.overCutline}/{data.total}
                </Typo>
              </RegionLabelContainer>
            ),
          })),
        ]}
        render={({ label }) => label}
      />
      <Select
        value={siteFilter}
        onChange={({ value }) => setSiteFilter(value)}
        items={[
          {
            value: "all",
            label: <RegionLabelContainer>All Sites</RegionLabelContainer>,
          },
          ...siteData.map((data) => ({
            value: data.site,
            label: (
              <RegionLabelContainer>
                <RegionLabel>{data.site}</RegionLabel>
                <Typo description tabular>
                  {data.overCutline}/{data.total}
                </Typo>
              </RegionLabelContainer>
            ),
          })),
        ]}
        render={({ label }) => label}
      />
      <TableContainer>
        <Table fullWidth>
          <colgroup>
            <col style={{ width: "2em" }} />
            <col style={{ width: "2em" }} />
            <col style={{ minWidth: "6em" }} />
            <col style={{ minWidth: "6em" }} />
            <col />
            <col style={{ width: "2em" }} />
          </colgroup>
          <TableHead>
            <Row>
              <Cell>#</Cell>
              <Cell>=</Cell>
              <Cell>Site</Cell>
              <Cell>Region</Cell>
              <Cell>Team</Cell>
              <Cell>?</Cell>
            </Row>
          </TableHead>
          <TableBody>
            {filteredTeams.length === 0 && (
              <Row>
                <Cell colSpan={6}>
                  <EmptyStatePlaceholder>
                    No teams match the selected filters.
                  </EmptyStatePlaceholder>
                </Cell>
              </Row>
            )}
            {filteredTeams.map((team, index) => {
              const isLastQualifiedTeam = index === lastQualifiedIndex;
              const isLastInvitedTeam = index === lastInvitedIndex;
              return (
                <Fragment key={team.teamId}>
                  <Row
                    style={
                      team.rank === -1
                        ? {
                            color: theme.color.text.secondary.main,
                          }
                        : {}
                    }
                  >
                    <Cell style={{ textAlign: "right" }}>
                      <Typo tabular>{team.rank === -1 ? "-" : team.rank}</Typo>
                    </Cell>
                    <Cell style={{ textAlign: "right" }}>
                      <Typo tabular description={isTeamInvited(team.status)}>
                        {isTeamInvited(team.status)
                          ? "invited"
                          : team.assignedValue.toFixed(4)}
                      </Typo>
                    </Cell>
                    <Cell>
                      {team.fromSite}
                      {team.rankInSite !== 0 && (
                        <>
                          {" "}
                          <Typo description>#{team.rankInSite}</Typo>
                        </>
                      )}
                    </Cell>
                    <Cell>
                      <Region
                        region={
                          INSTITUTION_REGION_MAP.get(team.institution) ??
                          "Unknown"
                        }
                      />
                      {team.rankInRegion !== -1 && (
                        <>
                          {" "}
                          <Typo description>#{team.rankInRegion}</Typo>
                        </>
                      )}
                    </Cell>
                    <Cell>
                      <Typo
                        ellipsis
                        style={{
                          display: "block",
                          lineHeight: 1,
                        }}
                      >
                        {team.teamName}
                      </Typo>
                      <Space h={4} />
                      <Typo
                        ellipsis
                        small
                        style={{
                          display: "block",
                          lineHeight: 1,
                        }}
                      >
                        {shortenInstitutionName(team.institution)}
                      </Typo>
                    </Cell>
                    <Cell>
                      {team.status !==
                        TeamRankInCombinedScoreboardStatus.NONE && (
                        <>
                          <Tooltip
                            title={<MergedScoreboardTooltip team={team} />}
                          >
                            <IconAlertCircle />
                          </Tooltip>
                        </>
                      )}
                    </Cell>
                  </Row>
                  {isLastInvitedTeam && (
                    <Row>
                      <InvitedCutlineCell colSpan={6}>
                        <IconArrowUp
                          style={{
                            verticalAlign: "middle",
                          }}
                        />
                        INVITED
                        <IconArrowUp
                          style={{
                            verticalAlign: "middle",
                          }}
                        />
                      </InvitedCutlineCell>
                    </Row>
                  )}
                  {isLastQualifiedTeam && (
                    <Row>
                      <QualifiedCutlineCell colSpan={6}>
                        <IconArrowUp
                          style={{
                            verticalAlign: "middle",
                          }}
                        />
                        QUALIFIED
                        <IconArrowUp
                          style={{
                            verticalAlign: "middle",
                          }}
                        />
                      </QualifiedCutlineCell>
                    </Row>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RegionScoreboard;
