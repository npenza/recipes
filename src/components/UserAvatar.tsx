import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';

type userAvatarProps = {
    image : string,
    name: string
}

export const UserAvatar = ({image , name}: userAvatarProps) => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Avatar.Root className="AvatarRoot">
      <Avatar.Image
        className="AvatarImage"
        src={image || ""}
        alt="Colm Tuite"
      />
      <Avatar.Fallback className="AvatarFallback" delayMs={600}>
        {name.split(" ").map((chars) => chars[0]?.toUpperCase())}
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
);

