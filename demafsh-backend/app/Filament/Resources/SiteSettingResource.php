<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteSettingResource\Pages;
use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationGroup = 'Company Profile';

    protected static ?string $navigationLabel = 'Pengaturan Situs';

    protected static ?string $modelLabel = 'Pengaturan Situs';

    protected static ?string $pluralModelLabel = 'Pengaturan Situs';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Identitas Organisasi')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('organization_name')
                            ->label('Nama Organisasi')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('cabinet_name')
                            ->label('Nama Kabinet')
                            ->placeholder('Kabinet Andalusia')
                            ->maxLength(150),
                        Forms\Components\TextInput::make('period')
                            ->label('Periode Kepengurusan')
                            ->required()
                            ->maxLength(100)
                            ->placeholder('2026–2027'),
                        Forms\Components\FileUpload::make('logo')
                            ->label('Logo Organisasi')
                            ->image()
                            ->imageEditor()
                            ->disk('public')
                            ->directory('settings')
                            ->visibility('public')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Hero & Profil Visi Misi')
                    ->schema([
                        Forms\Components\TextInput::make('hero_title')
                            ->label('Judul Hero')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Textarea::make('hero_subtitle')
                            ->label('Subjudul Hero')
                            ->rows(3),
                        Forms\Components\Textarea::make('vision')
                            ->label('Visi')
                            ->rows(3),
                        Forms\Components\Textarea::make('mission')
                            ->label('Misi')
                            ->rows(5)
                            ->helperText('Pisahkan setiap poin misi dengan baris baru.'),
                    ]),

                Forms\Components\Section::make('Kontak & Media Sosial')
                    ->columns(3)
                    ->schema([
                        Forms\Components\TextInput::make('instagram_handle')
                            ->label('Instagram')
                            ->placeholder('@demafshuinbdg')
                            ->maxLength(100),
                        Forms\Components\TextInput::make('email')
                            ->label('Email Resmi')
                            ->email()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('whatsapp')
                            ->label('Nomor WhatsApp')
                            ->placeholder('6281234567890')
                            ->maxLength(50),
                        Forms\Components\Textarea::make('address')
                            ->label('Alamat Sekretariat')
                            ->rows(2)
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('logo')
                    ->label('Logo')
                    ->disk('public')
                    ->circular(),
                Tables\Columns\TextColumn::make('organization_name')
                    ->label('Nama Organisasi')
                    ->searchable()
                    ->wrap(),
                Tables\Columns\TextColumn::make('period')
                    ->label('Periode')
                    ->badge()
                    ->color('primary')
                    ->searchable(),
                Tables\Columns\TextColumn::make('instagram_handle')
                    ->label('Instagram')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Diperbarui')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSiteSettings::route('/'),
            'create' => Pages\CreateSiteSetting::route('/create'),
            'edit' => Pages\EditSiteSetting::route('/{record}/edit'),
        ];
    }
}
